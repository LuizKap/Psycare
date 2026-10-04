import { useState } from "react"
import { Link, useNavigate } from "react-router"
import type { SubmitEvent } from "react"
import { ApiValidationError, type FormError } from "../../../../../types"
import styles from '../Register.module.css'
import { toast } from "sonner"
import { auth_api } from "../../../../../fetch/auth.api"
import { useAuth } from "../../../../../hooks/useAuth"


function RegisterPatient() {

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

            await auth_api.registerPatient(formData)
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

            toast.error('Erro ao cadastrar paciente')

        } finally { setLoading(false) }

    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            <label
                htmlFor="name"
                className={`${styles['input-container']} ${hasError("name") ? styles['input-error'] : ""}`}
            >
                <img src="/profile/user.svg" alt="" />
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nome Completo"
                />
            </label>

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

            <div className={styles['pass-container']}>

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

                <label
                    htmlFor="confirmPassword"
                    className={`${styles['input-container']} ${hasError("confirmPassword") ? styles['input-error'] : ""}`}
                >
                    <img src="/profile/password.svg" alt="" />
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirme a senha"
                    />
                </label>

            </div>

            <label
                htmlFor="phone"
                className={`${styles['input-container']} ${hasError("phone") ? styles['input-error'] : ""}`}
            >
                <img src="/profile/phone.svg" alt="" />
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="telefone exemplo: 21987654321"
                />
            </label>

            <button
                className={styles['submit-button']}
                type="submit"
                disabled={loading}
            >
                {loading ? "Criando conta..." : "Criar Conta"}
            </button>

            <div className={styles['log-in']}>
                <span>Já tem uma conta?</span>
                <Link to="/login/patient">
                    Fazer Login
                </Link>
            </div>

        </form>
    )

}

export default RegisterPatient