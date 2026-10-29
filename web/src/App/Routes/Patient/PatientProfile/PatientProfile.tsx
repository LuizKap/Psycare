import { useEffect, useState } from "react"
import { useAuth } from "../../../../hooks/useAuth"
import { usePatient } from "../../../../hooks/usePatient"
import { ErrorState } from "../../../components/Error/Error"
import { Loading } from "../../../components/Loading/Loading"
import styles from "./PatientProfile.module.css"
import type { Patient } from "../../../../types"
import { useUpdatePatient } from "../../../../hooks/useUpdatePatient"

export function PatientProfile() {
    const { user } = useAuth()

    const {
        patient,
        loading: patientLoading,
        error,
        refreshPatient
    } = usePatient()

    const {
        updatePatient,
        loading: updateLoading
    } = useUpdatePatient()

    const [updatedPatient, setUpdatedPatient] =
        useState<Pick<Patient, "name" | "phone"> | null>(null)

    useEffect(() => {
        if (!patient) return

        setUpdatedPatient({
            name: patient.name,
            phone: patient.phone
        })
    }, [patient])

    if (patientLoading) return <Loading />

    if (error || !patient) {
        return (
            <ErrorState
                onRetry={refreshPatient}
                message="Não foi possível carregar informações do paciente"
            />
        )
    }

    const updatedPhone = updatedPatient?.phone?.trim() ?? ""
    const currentPhone = patient.phone?.trim() ?? ""

    const hasChanges =
        updatedPatient !== null &&
        (
            updatedPatient.name !== patient.name ||
            updatedPhone !== currentPhone
        )

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
                    <div>
                        <h2>Informações pessoais</h2>
                        <p>
                            Mantenha seus dados atualizados.
                        </p>
                    </div>
                </div>

                <div className={styles["profile-form"]}>
                    <section className={styles["photo-section"]}>
                        <div className={styles.avatar}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="8" r="4" />
                                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                            </svg>
                        </div>

                        <div className={styles["photo-info"]}>
                            <h3>Foto de perfil</h3>
                            <p>
                                Escolha uma foto para personalizar sua conta.
                            </p>

                            <button
                                className={styles["photo-button"]}
                                type="button"
                            >
                                Alterar foto
                            </button>
                        </div>
                    </section>

                    <div className={styles.divider} />

                    <div className={styles["form-grid"]}>
                        <label className={styles["form-field"]}>
                            <span>Nome completo</span>

                            <input
                                type="text"
                                name="name"
                                value={updatedPatient?.name ?? ""}
                                placeholder="Digite seu nome completo"
                                onChange={(ev) => {
                                    setUpdatedPatient(prev => ({
                                        name: ev.target.value,
                                        phone: prev?.phone ?? patient.phone
                                    }))
                                }}
                            />
                        </label>

                        <label className={styles["form-field"]}>
                            <span>E-mail</span>

                            <input
                                type="email"
                                name="email"
                                value={user?.email ?? ""}
                                readOnly
                            />

                            <small>
                                O e-mail não pode ser alterado nesta versão do PsyCare.
                            </small>
                        </label>

                        <label className={styles["form-field"]}>
                            <span>Telefone</span>

                            <input
                                type="tel"
                                name="phone"
                                value={updatedPatient?.phone ?? ""}
                                placeholder="Digite seu telefone"
                                onChange={(ev) => {
                                    setUpdatedPatient(prev => ({
                                        name: prev?.name ?? patient.name,
                                        phone: ev.target.value
                                    }))
                                }}
                            />

                            <small>
                                Seu telefone é uma informação pessoal da sua conta.
                            </small>
                        </label>
                    </div>

                    <div className={styles["form-actions"]}>
                        <button
                            className={styles["primary-button"]}
                            type="button"
                            disabled={updateLoading || !hasChanges}
                            onClick={() => {
                                if (!updatedPatient) return

                                const changes: {
                                    name?: string
                                    phone?: string | null
                                } = {}

                                if (updatedPatient.name !== patient.name) {
                                    changes.name = updatedPatient.name
                                }

                                if (updatedPhone !== currentPhone) {
                                    changes.phone = updatedPhone || null
                                }

                                void updatePatient(changes)
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