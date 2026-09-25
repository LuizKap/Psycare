import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import type { SubmitEvent } from "react"
import type { ApiError, FormError } from "./types"
import { AuthContext } from "../../../../../contexts/Auth.context"
import styles from '../Register.module.css'


function RegisterPatient() {

    const auth = useContext(AuthContext)

    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)

    const [formErrors, setFormErrors] = useState<FormError[] | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    function getError(field: string) {
        return formErrors?.find(error => error.path.includes(field))?.message
    }


    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setError(null)
        setFormErrors(null)

        const formData = new FormData(event.currentTarget)

        try {

            setLoading(true)

            const response = await fetch("/auth/register/patient", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    confirmPassword: formData.get('confirmPassword'),
                    phone: formData.get('phone') || undefined
                })
            })

            if (!response.ok) {
                const data: ApiError = await response.json()
                setError(data.message)
                setFormErrors(data.errors)
                return
            }

            const data = await response.json()
            auth?.setUser(data.user)
            navigate('/')

        } finally { setLoading(false) }

    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>

                {getError('name') && (
                    <span className={styles['error-message']}>
                        {getError('name')}
                    </span>
                )}

                <label
                    htmlFor="name"
                    className={`${styles['input-container']} ${getError("name") ? styles['input-error'] : ""}`}
                >
                    <img src="/profile/user.svg" alt="" />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nome Completo"
                    />
                </label>

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

                {getError('confirmPassword') && (
                    <span className={styles['error-message']}>
                        {getError('confirmPassword')}
                    </span>
                )}

                <div className={styles['pass-container']}>

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

                    <label
                        htmlFor="confirmPassword"
                        className={`${styles['input-container']} ${getError("confirmPassword") ? styles['input-error'] : ""}`}
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

                {getError('phone') && (
                    <span className={styles['error-message']}>
                        {getError('phone')}
                    </span>
                )}

                <label
                    htmlFor="phone"
                    className={`${styles['input-container']} ${getError("phone") ? styles['input-error'] : ""}`}
                >
                    <img src="/profile/phone.svg" alt="" />
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="telefone exemplo: 21987654321"
                    />
                </label>

                {error && (
                    <p className={styles['form-error']}>
                        Erro: {error}
                    </p>
                )}

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
        </>
    )

}

export default RegisterPatient