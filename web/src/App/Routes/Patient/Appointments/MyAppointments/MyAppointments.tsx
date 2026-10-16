import { useScheduledAppointments } from "../../../../../hooks/useScheduledAppointments"
import dayjs from "../../../../../utils/dayjs"
import styles from "./MyAppointments.module.css"
import { usePreviousAppointments } from "../../../../../hooks/usePreviousAppointments"
import { InlineError } from "../../../../components/Error/InlineError"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { useEffect } from "react"

export function MyAppointments() {

    const {
        appointments: scheduledAppointments,
        loading,
        refreshScheduledAppointments,
        error
    } = useScheduledAppointments()

    const {
        previousAppointments,
        refreshPreviousAppointments,
        loading: previousAppointmentsLoading,
        error: previousAppointmentsError
    } = usePreviousAppointments()

    useEffect(() => {
        void refreshScheduledAppointments();
        void refreshPreviousAppointments();
    }, [refreshPreviousAppointments, refreshScheduledAppointments])


    return (
        <SkeletonTheme
            baseColor="#A8C5B4"
            highlightColor="#F0F7F2"
        >
            <main className={styles["appointments-page"]}>

                <header className={styles["page-header"]}>
                    <h1>Minhas consultas</h1>
                    <p>Confira suas próximas consultas e seu histórico.</p>
                </header>

                <section className={styles["appointments-section"]}>

                    <div className={styles["section-header"]}>
                        <h2>Próximas consultas</h2>
                    </div>

                    <div className={styles["appointments-list"]}>

                        {loading ? (
                            <Skeleton count={2} width={500} />
                        ) : error ?
                            (
                                <InlineError
                                    onRetry={refreshScheduledAppointments}
                                    message="Não foi possível carregar consultas agendadas" />

                            ) : scheduledAppointments.length === 0 ?
                                (
                                    <p>Nenhuma consulta agendada</p>
                                )
                                :
                                (
                                    scheduledAppointments.map((appointment) => (

                                        <article
                                            key={appointment.id}
                                            className={styles["appointment-card"]}
                                        >
                                            <div className={styles["appointment-date"]}>
                                                <span>
                                                    {dayjs(appointment.starts_at).format("DD")}
                                                </span>

                                                <small>
                                                    {dayjs(appointment.starts_at).format("MMMM")}
                                                </small>
                                            </div>

                                            <div className={styles["appointment-info"]}>
                                                <p>
                                                    {dayjs(appointment.starts_at)
                                                        .tz('America/Sao_Paulo')
                                                        .format("DD/MM/YYYY [às] HH:mm")}
                                                </p>

                                                <span className={styles["appointment-status"]}>
                                                    {appointment.status === "SCHEDULED"
                                                        ? "Agendado"
                                                        : ""}
                                                </span>
                                            </div>

                                            <div className={styles["appointment-actions"]}>
                                                <button type="button">
                                                    Ver detalhes
                                                </button>

                                                <button type="button">
                                                    Reagendar
                                                </button>
                                            </div>
                                        </article>

                                    ))
                                )}

                    </div>
                </section>

                <section className={styles["appointments-section"]}>

                    <div className={styles["section-header"]}>
                        <h2>Histórico</h2>
                    </div>

                    <div className={styles["appointments-list"]}>

                        {previousAppointmentsLoading ? (
                            <Skeleton count={2} width={500} />
                        )
                            : previousAppointmentsError ? (
                                <InlineError
                                    onRetry={refreshPreviousAppointments}
                                    message="Não foi possível carregar consultas anteriores"
                                />
                            )
                                : previousAppointments.length === 0 ?
                                    <p> Nenhuma consulta anterior </p>
                                    :
                                    (
                                        previousAppointments.map((appointment) => (

                                            <article className={styles["appointment-card"]} key={appointment.id}>

                                                <div className={styles["appointment-date"]}>

                                                    <span>
                                                        {dayjs(appointment.starts_at).tz('America/Sao_Paulo').format('DD')}
                                                    </span>

                                                    <small>
                                                        {dayjs(appointment.starts_at).tz('America/Sao_Paulo').format('MMMM')}
                                                    </small>

                                                </div>

                                                <div className={styles["appointment-info"]}>

                                                    <p>
                                                        {
                                                            dayjs(appointment.starts_at)
                                                                .tz('America/Sao_Paulo')
                                                                .format("DD/MM/YYYY [às] HH:mm")
                                                        }
                                                    </p>

                                                    <span className={styles["appointment-status"]}>
                                                        {
                                                            appointment.status === 'COMPLETED' ? 'Concluída'
                                                                : appointment.status === 'CANCELLED' ? 'Cancelada' :
                                                                    ''
                                                        }
                                                    </span>
                                                </div>

                                                <div className={styles["appointment-actions"]}>
                                                    <button type="button">
                                                        Ver detalhes
                                                    </button>
                                                </div>
                                            </article>

                                        ))
                                    )
                        }
                    </div>
                </section>

            </main>
        </SkeletonTheme>
    )
}