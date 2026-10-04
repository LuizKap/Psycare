import { Link, useNavigate } from "react-router";
import { ApiValidationError, type FormError } from "../../../../../types";
import styles from "../Login.module.css"
import { useAuth } from "../../../../../hooks/useAuth";
import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import { auth_api } from "../../../../../fetch/auth.api";


export function LoginPsychologist() {

    const auth = useAuth()

    const navigate = useNavigate()

    const [formErrors, setFormErrors] = useState<FormError[] | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    function hasError(field: string) {
        return formErrors?.some(error => error.path.includes(field))
    }


    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setFormErrors(null)

        const formData = new FormData(event.currentTarget)

        try {

            setLoading(true)

            await auth_api.loginPsychologist(formData)
            await auth.refreshAuth()

            navigate('/')

        } catch (error) {

            if (error instanceof ApiValidationError) {
                setFormErrors(error.errors ?? [])

                const messages = error.errors?.map(({ message }) => message) ?? []

                toast.error(
                    messages.length > 0 ? (
                        <div>
                            {messages.map((message, index) => (
                                <div key={index}>
                                    {message}
                                    <hr className={styles['error-divider']} />
                                </div>
                            ))}
                        </div>
                    ) : (error.message)
                )

                return
            }

            toast.error('Erro ao logar psicólogo')

        } finally { setLoading(false) }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            <label
                htmlFor="email"
                className={`${styles['input-container']} ${hasError("email") ? styles['input-error'] : ""}`}
            >
                <img src="/profile/email.svg" alt="" />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email: exemplo@gmail.com"
                />
            </label>

            <label
                htmlFor="password"
                className={`${styles['input-container']} ${hasError("password") ? styles['input-error'] : ""}`}
            >
                <img src="/profile/password.svg" alt="" />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Digite sua senha"
                />
            </label>

            <label className={`${styles['input-container']} ${hasError("entryCode") ? styles['input-error'] : ""}`}>
                <img src="/profile/password.svg" alt="" />
                <input type="text" name="entryCode" id="entryCode" placeholder="Digite o código" />
            </label>

            <button
                className={styles['submit-button']}
                type="submit"
                disabled={loading}
            >
                {loading ? "Entrando..." : "Login"}
            </button>

            <div className={styles.register}>
                <span>Ainda não tem uma conta?</span>
                <Link to="/register/psychologist">
                    Registrar-se
                </Link>
            </div>

        </form>
    )
}