import { useState } from "react"
import { Link, useNavigate } from "react-router"
import type { SubmitEvent } from "react"
import './Patient.css'
import type { ApiError, FormError } from "../types"


function RegisterPatient() {

    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)

    const [formErrors, setFormErrors] = useState<FormError[] | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    function hasError(field: string) {
        return formErrors?.some(error => error.path.includes(field))
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
                    name: formData.get('username'),
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

        <div className="register-content">
            <form onSubmit={handleSubmit}>

                <label htmlFor="username" className={hasError("name") ? "input-error" : ""}>
                    <img src="/profile/user.svg" alt="" />
                    <input type="text" name="username" id="username" placeholder="Nome Completo" />
                </label>

                <label htmlFor="email" className={hasError("email") ? "input-error" : ""}>
                    <img src="/profile/email.svg" alt="" />
                    <input type="email" name="email" id="email" placeholder="email: exemplo@gmail.com" />
                </label>

                <div className="pass-container">
                    <label htmlFor="password" className={hasError("password") ? "input-error" : ""}>
                        <img src="/profile/password.svg" alt="" />
                        <input type="password" name="password" id="password" placeholder="Digite sua senha" />
                    </label>

                    <label htmlFor="confirmPassword" className={hasError("password") ? "input-error" : ""}>
                        <img src="/profile/password.svg" alt="" />
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme a senha" />
                    </label>
                </div>

                <label htmlFor="phone" className={hasError("phone") ? "input-error" : ""}>
                    <img src="/profile/phone.svg" alt="" />
                    <input type="tel" name="phone" id="phone" placeholder="telefone exemplo: 21987654321" />
                </label>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" disabled={loading}>{loading ? "Criando conta..." : "Criar Conta"}</button>

                <div className="log-in">
                    <span>Já tem uma conta?</span>
                    <Link to='/login/patient'>Fazer Login</Link>
                </div>

            </form>

            <img src="/emotions/calmness-login.png" alt="" className="calmness-login" />
        </div>
    )

}

export default RegisterPatient