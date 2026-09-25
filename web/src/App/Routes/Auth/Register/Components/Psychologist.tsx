import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router"
import type { ApiError, FormError } from "./types"
import styles from '../Register.module.css'


function RegisterPsychologist() {

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

            const response = await fetch('/auth/register/psychologist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    confirmPassword: formData.get('confirmPassword'),
                    entryCode: formData.get('entryCode'),
                    phone: formData.get('phone')
                })
            })

            if (!response.ok) {
                const data: ApiError = await response.json()
                setError(data.message)
                setFormErrors(data.errors)
                return
            }

            navigate('/')

        } finally { setLoading(false) }

    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            {getError('name') && <span className={styles['error-message']}>{getError('name')}</span>}

            <label className={`${styles['input-container']} ${getError("name") ? styles['input-error'] : ""}`}>
                <img src="/profile/user.svg" alt="" />
                <input type="text" name="name" id="name" placeholder="Nome Completo" />
            </label>

            {getError('email') && <span className={styles['error-message']}>{getError('email')}</span>}

            <label className={`${styles['input-container']} ${getError("email") ? styles['input-error'] : ""}`}>
                <img src="/profile/email.svg" alt="" />
                <input type="email" name="email" id="email" placeholder="email: exemplo@gmail.com" />
            </label>

            {getError('password') && <span className={styles['error-message']}>{getError('password')}</span>}
            {getError('confirmPassword') && <span className={styles['error-message']}>{getError('confirmPassword')}</span>}

            <div className={styles['pass-container']}>

                <label className={`${styles['input-container']} ${getError("password") ? styles['input-error'] : ""}`}>
                    <img src="/profile/password.svg" alt="" />
                    <input type="password" name="password" id="password" placeholder="Digite sua senha" />
                </label>

                <label className={`${styles['input-container']} ${getError("confirmPassword") ? styles['input-error'] : ""}`}>
                    <img src="/profile/password.svg" alt="" />
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme a senha" />
                </label>

            </div>

            {getError('entryCode') && <span className={styles['error-message']}>{getError('entryCode')}</span>}

            <label className={`${styles['input-container']} ${getError("entryCode") ? styles['input-error'] : ""}`}>
                <img src="/profile/password.svg" alt="" />
                <input type="text" name="entryCode" id="entryCode" placeholder="Digite o código" />
            </label>

            {getError('phone') && <span className={styles['error-message']}>{getError('phone')}</span>}

            <label className={`${styles['input-container']} ${getError("phone") ? styles['input-error'] : ""}`}>
                <img src="/profile/phone.svg" alt="" />
                <input type="tel" name="phone" id="phone" placeholder="telefone exemplo: 21987654321" />
            </label>

            {error && <p className={styles['form-error']}>Erro: {error}</p>}

            <button type="submit" disabled={loading} className={styles['submit-button']}>{loading ? "Criando conta..." : "Criar Conta"}</button>

            <div className={styles['log-in']}>
                <span>Já tem uma conta?</span>
                <Link to='/login/psychologist'>Fazer Login</Link>
            </div>

        </form>
    )

}

export default RegisterPsychologist