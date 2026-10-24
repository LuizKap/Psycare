import { useEffect, useState } from "react"
import { usePsychologist } from "../../../../hooks/usePsychologist"
import { useUpdatePsychologist } from "../../../../hooks/useUpdatePsychologist"
import styles from "./PsychologistProfile.module.css"
import { ErrorState } from "../../../components/Error/Error"
import { Loading } from "../../../components/Loading/Loading"
import { useAuth } from "../../../../hooks/useAuth"

export function PsychologistProfile() {

    const { user } = useAuth()

    const { psychologist, loading: psychologistLoading, refreshPsychologist, error } = usePsychologist()

    const { updatePsychologist, loading: updateLoading } = useUpdatePsychologist()

    const [updatedPsychologist, setUpdatedPsychologist] = useState<{ name?: string, phone?: string }>()

    useEffect(() => {
        if (!psychologist) return

        setUpdatedPsychologist({ name: psychologist.name, phone: psychologist.phone })

    }, [psychologist])


    if (psychologistLoading) return <Loading />

    if (error || !psychologist) {
        return (
            <ErrorState
                onRetry={refreshPsychologist}
                message="Não foi possível carregar seu perfil :("
            />
        )
    }

    return (
        <main className={styles["profile-page"]}>
            <header className={styles["page-header"]}>
                <div>
                    <h1>Meu perfil</h1>
                    <p>
                        Gerencie suas informações pessoais.
                    </p>
                </div>
            </header>

            <section className={styles["profile-card"]}>
                <div className={styles["profile-card-header"]}>
                    <div className={styles.avatar}>
                        <span>
                            {`${psychologist.name.charAt(0).toUpperCase()}${psychologist.name.charAt(1).toUpperCase()}`}
                        </span>
                    </div>

                    <div className={styles["profile-heading"]}>
                        <h2>{psychologist.name}</h2>
                        <p>Informações pessoais</p>
                    </div>
                </div>

                <div className={styles["profile-form"]}>
                    <div className={styles["form-grid"]}>
                        <label className={styles["form-field"]}>
                            <span>Nome completo</span>

                            <input
                                type="text"
                                name="name"
                                defaultValue={psychologist.name}
                                placeholder="Digite seu nome completo"
                                onChange={(ev) => setUpdatedPsychologist((prev) => ({ ...prev, name: ev.target.value }))}
                            />
                        </label>

                        <label className={styles["form-field"]}>
                            <span>E-mail</span>

                            <input
                                type="email"
                                name="email"
                                defaultValue={user?.email}
                                readOnly
                            />

                            <small>
                                O e-mail não pode ser alterado na versão atual do PsyCare.
                            </small>
                        </label>

                        <label className={styles["form-field"]}>
                            <span>Telefone</span>

                            <input
                                type="tel"
                                name="phone"
                                defaultValue={psychologist.phone}
                                placeholder="Digite seu telefone"
                                onChange={(ev) => setUpdatedPsychologist((prev) => ({ ...prev, phone: ev.target.value }))}
                            />
                        </label>
                    </div>

                    <div className={styles["form-actions"]}>

                        <button
                            className={styles["primary-button"]}
                            type="button"
                            disabled={
                                updateLoading ||
                                !updatedPsychologist ||
                                (updatedPsychologist?.name === psychologist.name
                                    && updatedPsychologist?.phone === psychologist.phone)}

                            onClick={() => {
                                if (!updatedPsychologist) return

                                const changes: { name?: string; phone?: string } = {}

                                if (updatedPsychologist.name !== psychologist.name) {
                                    changes.name = updatedPsychologist.name
                                }

                                if (updatedPsychologist.phone !== psychologist.phone) {
                                    changes.phone = updatedPsychologist.phone
                                }

                                void updatePsychologist(changes)
                            }}
                        >
                            Salvar alterações
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}