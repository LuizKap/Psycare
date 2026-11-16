import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../../../hooks/useAuth"
import { usePatient } from "../../../../hooks/usePatient"
import { Loading } from "../../../components/Loading/Loading"
import styles from "./PatientProfile.module.css"
import { useUpdatePatient } from "../../../../hooks/useUpdatePatient"
import { ErrorState } from "../../../components/Error/Error"
import { useUpdateProfilePicture } from "../../../../hooks/useUpdateProfilePicture"
import Skeleton from "react-loading-skeleton"
import { useRemoveProfilePicture } from "../../../../hooks/useRemoveProfilePicture"

export function PatientProfile() {

    const { user } = useAuth()

    const inputFileRef = useRef<HTMLInputElement>(null)

    const { loading: patientLoading, patient, error, refreshPatient } = usePatient()

    const { updateProfilePicture, loading: pictureLoading } = useUpdateProfilePicture()

    const { removeProfilePicture, loading: removeLoading } = useRemoveProfilePicture()

    const { updatePatient, loading: updateLoading } = useUpdatePatient()

    const [updatedPatient, setUpdatedPatient] = useState<{ name?: string, phone?: string | null }>()

    const photoLoading = pictureLoading || removeLoading

    useEffect(() => {

        if (!patient) return

        setUpdatedPatient({ name: patient.name, phone: patient.phone })

    }, [patient])


    if (patientLoading) return <Loading />

    if (error || !patient) {
        return (
            <ErrorState
                onRetry={refreshPatient}
                message="Não foi possível carregar seu perfil :("
            />
        )
    }

    const currentPhone = patient.phone ?? ''

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
                            {photoLoading ? (
                                <Skeleton
                                    width="100%"
                                    height="100%"
                                    borderRadius={25}
                                />
                            ) : patient.profile_image_url ? (
                                <img
                                    src={patient.profile_image_url}
                                    className={styles["photo-img"]}
                                    alt="Foto de perfil do paciente"
                                />
                            ) : (
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
                            )}

                        </div>

                        <div className={styles["photo-info"]}>
                            <h3>Foto de perfil</h3>
                            <p>
                                Escolha uma foto para personalizar sua conta.
                            </p>

                            <input type="file" accept="image/*"
                                style={{ display: "none" }}
                                ref={inputFileRef}
                                disabled={photoLoading}

                                onChange={async (ev) => {

                                    const file = ev.currentTarget.files?.[0]

                                    if (!file) return

                                    await updateProfilePicture(file)
                                    await refreshPatient()
                                }}

                            />

                            <div className={styles["photo-actions"]}>
                                <button
                                    className={styles["photo-button"]}
                                    type="button"
                                    disabled={photoLoading}
                                    onClick={() => inputFileRef.current?.click()}
                                >
                                    Alterar foto
                                </button>

                                {patient.profile_image_url && (
                                    <button
                                        className={styles["remove-photo-button"]}
                                        type="button"
                                        disabled={photoLoading}
                                        onClick={async () => {
                                            await removeProfilePicture()
                                            await refreshPatient()
                                        }}
                                    >
                                        Remover foto
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className={styles.divider} />

                    <div className={styles["form-grid"]}>
                        <label className={styles["form-field"]}>
                            <span>Nome completo</span>

                            <input
                                type="text"
                                name="name"
                                value={updatedPatient?.name ?? patient.name}
                                placeholder="Digite seu nome completo"
                                onChange={(ev) => setUpdatedPatient((prev) => ({
                                    ...prev,
                                    name: ev.target.value
                                }))}
                            />
                        </label>

                        <label className={styles["form-field"]}>
                            <span>E-mail</span>

                            <input
                                type="email"
                                name="email"
                                value={user?.email}
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
                                value={updatedPatient ? updatedPatient.phone ?? "" : currentPhone}
                                placeholder="Digite seu telefone"
                                onChange={(ev) => setUpdatedPatient((prev) => ({
                                    ...prev,
                                    phone: ev.target.value.trim() || null,
                                }))}
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
                            disabled={
                                !updatedPatient
                                || updateLoading
                                || updatedPatient?.name === patient.name
                                && updatedPatient?.phone === patient.phone
                            }

                            onClick={async () => {
                                if (!updatedPatient) return

                                const changes: { name?: string, phone?: string | null } = {}

                                if (updatedPatient.name !== patient.name) changes.name = updatedPatient.name

                                if (updatedPatient.phone !== patient.phone) changes.phone = updatedPatient.phone

                                await updatePatient(changes)
                                refreshPatient()
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