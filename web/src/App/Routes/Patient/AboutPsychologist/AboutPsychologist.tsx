
import { useNavigate } from "react-router"
import { usePsychologistPublicProfile } from "../../../../hooks/usePsychologistPublicProfile"
import { ErrorState } from "../../../components/Error/Error"
import { Loading } from "../../../components/Loading/Loading"
import styles from "./AboutPsychologist.module.css"

export function AboutPsychologist() {

    const navigate = useNavigate()

    const { loading, error, psychologist, refreshPsychologist } = usePsychologistPublicProfile()

    if (loading) return <Loading />

    if (error || !psychologist) return <ErrorState
        onRetry={refreshPsychologist}
        message="Erro ao carregar informações do psicólogo" />

    return (
        <main className={styles["about-page"]}>
            <header className={styles["page-header"]}>
                <span className={styles.eyebrow}>
                    PSYCARE
                </span>

                <h1>Sobre o psicólogo</h1>

                <p>
                    Conheça o profissional responsável pelo seu acompanhamento.
                </p>
            </header>

            <section className={styles["profile-card"]}>
                <div className={styles["profile-cover"]} />

                <div className={styles["profile-content"]}>
                    <div className={styles["profile-avatar"]}>
                        <span>
                            {`${psychologist.name.charAt(0).toUpperCase()}${psychologist.name.charAt(1).toUpperCase()}`}
                        </span>
                    </div>

                    <div className={styles["profile-heading"]}>
                        <span className={styles["profile-label"]}>
                            SEU PSICÓLOGO
                        </span>

                        <h2>{psychologist.name}</h2>

                        <p>
                            Profissional responsável pelo seu acompanhamento.
                        </p>
                    </div>

                    <div className={styles["profile-divider"]} />

                    <section className={styles["contact-section"]}>
                        <div className={styles["section-heading"]}>
                            <div className={styles["section-icon"]}>
                                <span>i</span>
                            </div>

                            <div>
                                <h3>Informações de contato</h3>

                                <p>
                                    Confira os dados disponibilizados pelo profissional.
                                </p>
                            </div>
                        </div>

                        <div className={styles["contact-grid"]}>
                            <div className={styles["contact-item"]}>
                                <div className={styles["contact-icon"]}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.76 2.04Z" />
                                    </svg>
                                </div>

                                <div className={styles["contact-info"]}>
                                    <span>Telefone</span>
                                    <strong>{psychologist.phone}</strong>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className={styles["profile-footer"]}>
                        <p>
                            O PsyCare está aqui para ajudar você a cuidar do seu bem-estar.
                        </p>

                        <button
                            className={styles["schedule-button"]}
                            type="button"
                            onClick={() => navigate('/appointments/create')}
                        >
                            Agendar consulta
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
}