import { useState } from "react"
import { Link, useNavigate } from "react-router"
import type { SubmitEvent } from "react"
import type { ApiError, FormError } from "../types"


function RegisterPatient() {

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

            navigate('/')

        } finally { setLoading(false) }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                {getError('name') && <span className="error-message">{getError('name')}</span>}

                <label htmlFor="name" className={getError("name") ? "input-error" : ""}>
                    <img src="/profile/user.svg" alt="" />
                    <input type="text" name="name" id="name" placeholder="Nome Completo" />
                </label>

                {getError('email') && <span className="error-message">{getError('email')}</span>}

                <label htmlFor="email" className={getError("email") ? "input-error" : ""}>
                    <img src="/profile/email.svg" alt="" />
                    <input type="email" name="email" id="email" placeholder="email: exemplo@gmail.com" />
                </label>

                {getError('password') && <span className="error-message">{getError('password')}</span>}
                {getError('confirmPassword') && <span className="error-message">{getError('confirmPassword')}</span>}

                <div className="pass-container">
                    <label htmlFor="password" className={getError("password") ? "input-error" : ""}>
                        <img src="/profile/password.svg" alt="" />
                        <input type="password" name="password" id="password" placeholder="Digite sua senha" />
                    </label>

                    <label htmlFor="confirmPassword" className={getError("confirmPassword") ? "input-error" : ""}>
                        <img src="/profile/password.svg" alt="" />
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme a senha" />
                    </label>
                </div>

                {getError('phone') && <span className="error-message">{getError('phone')}</span>}

                <label htmlFor="phone" className={getError("phone") ? "input-error" : ""}>
                    <img src="/profile/phone.svg" alt="" />
                    <input type="tel" name="phone" id="phone" placeholder="telefone exemplo: 21987654321" />
                </label>

                {error && <p className="form-error">Erro: {error}</p>}

                <button type="submit" disabled={loading}>{loading ? "Criando conta..." : "Criar Conta"}</button>

                <div className="log-in">
                    <span>Já tem uma conta?</span>
                    <Link to='/login/patient'>Fazer Login</Link>
                </div>

            </form>
        </>
    )

}

export default RegisterPatient