import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router"
import { ApiValidationError, type FormError } from "../../../../../types"
import styles from '../Register.module.css'
import { useAuth } from "../../../../../hooks/useAuth"
import { toast } from "sonner"
import { auth_api } from "../../../../../fetch/auth.api"


function RegisterPsychologist() {

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

            await auth_api.registerPsychologist(formData)
            await auth.refreshAuth()

            navigate('/psychologist')

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

            toast.error('Erro ao cadastrar psicólogo')
        } finally { setLoading(false) }

    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>



            <label className={`${styles['input-container']} ${hasError("name") ? styles['input-error'] : ""}`}>
                <img src="/profile/user.svg" alt="" />
                <input type="text" name="name" id="name" placeholder="Nome Completo" />
            </label>



            <label className={`${styles['input-container']} ${hasError("email") ? styles['input-error'] : ""}`}>
                <img src="/profile/email.svg" alt="" />
                <input type="email" name="email" id="email" placeholder="email: exemplo@gmail.com" />
            </label>



            <div className={styles['pass-container']}>

                <label className={`${styles['input-container']} ${hasError("password") ? styles['input-error'] : ""}`}>
                    <img src="/profile/password.svg" alt="" />
                    <input type="password" name="password" id="password" placeholder="Digite sua senha" />
                </label>

                <label className={`${styles['input-container']} ${hasError("confirmPassword") ? styles['input-error'] : ""}`}>
                    <img src="/profile/password.svg" alt="" />
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirme a senha" />
                </label>

            </div>



            <label className={`${styles['input-container']} ${hasError("entryCode") ? styles['input-error'] : ""}`}>
                <img src="/profile/password.svg" alt="" />
                <input type="text" name="entryCode" id="entryCode" placeholder="Digite o código" />
            </label>



            <label className={`${styles['input-container']} ${hasError("phone") ? styles['input-error'] : ""}`}>
                <img src="/profile/phone.svg" alt="" />
                <input type="tel" name="phone" id="phone" placeholder="telefone exemplo: 21987654321" />
            </label>

            <button type="submit" disabled={loading} className={styles['submit-button']}>{loading ? "Criando conta..." : "Criar Conta"}</button>

            <div className={styles['log-in']}>
                <span>Já tem uma conta?</span>
                <Link to='/login/psychologist'>Fazer Login</Link>
            </div>

        </form>
    )

}

export default RegisterPsychologist