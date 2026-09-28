import { Link, useNavigate } from "react-router";
import type { ApiError, FormError } from "../../../../../types";
import styles from "../Login.module.css"
import { useAuth } from "../../../../../hooks/useAuth";
import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";


export function LoginPsychologist() {

    const auth = useAuth()

    const navigate = useNavigate()

    const [formErrors, setFormErrors] = useState<FormError[] | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    function getError(field: string) {
        return formErrors?.find(error => error.path.includes(field))?.message
    }


    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setFormErrors(null)

        const formData = new FormData(event.currentTarget)

        try {

            setLoading(true)

            const response = await fetch("/auth/login/psychologist", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                    entryCode: formData.get('entryCode')
                })
            })

            if (!response.ok) {
                const data: ApiError = await response.json()
                toast.error(data.message)
                setFormErrors(data.errors)
                return
            }

            await auth.refreshProfile()
            navigate('/')

        } finally { setLoading(false) }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            {getError('email') && (
                <span className={styles['error-message']}>
                    {getError('email')}
                </span>
            )}

            <label
                htmlFor="email"
                className={`${styles['input-container']} ${getError("email") ? styles['input-error'] : ""}`}
            >
                <img src="/profile/email.svg" alt="" />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email: exemplo@gmail.com"
                />
            </label>

            {getError('password') && (
                <span className={styles['error-message']}>
                    {getError('password')}
                </span>
            )}

            <label
                htmlFor="password"
                className={`${styles['input-container']} ${getError("password") ? styles['input-error'] : ""}`}
            >
                <img src="/profile/password.svg" alt="" />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Digite sua senha"
                />
            </label>

            {getError('entryCode') && <span className={styles['error-message']}>{getError('entryCode')}</span>}

            <label className={`${styles['input-container']} ${getError("entryCode") ? styles['input-error'] : ""}`}>
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