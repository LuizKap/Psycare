
import { useEffect, useState } from "react"
import { appointment_api } from "../../../../fetch/appointment.api"
import { useScheduledAppointment } from "../../../../hooks/useScheduledAppointment"
import dayjs from '../../../../utils/dayjs'
import styles from "./MyAppointments.module.css"
import type { Appointment } from "../../../../types"

export function MyAppointments() {

    const appointments_data = useScheduledAppointment()
    const scheduledAppointments = appointments_data.appointments

    const [previousAppointments, setPreviousAppointments] = useState<Appointment[]>([])

    useEffect(() => {

        async function loadDashboard() {

            try {

                

            } catch (error) {


            }
        }


        loadDashboard()
    }, [])

    return (
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

                    {
                        scheduledAppointments.length === 0 ?
                            'Nenhuma consulta agendada' :
                            scheduledAppointments.map((appointment) => (

                                <article key={appointment.id} className={styles["appointment-card"]}>
                                    <div className={styles["appointment-date"]}>
                                        <span>{dayjs(appointment.starts_at).format('DD')}</span>
                                        <small>{dayjs(appointment.starts_at).format('MMMM')}</small>
                                    </div>

                                    <div className={styles["appointment-info"]}>
                                        <p>{dayjs(appointment.starts_at).format('DD/MM/YYYY [às] HH:mm')}</p>
                                        <span className={styles["appointment-status"]}>
                                            {appointment.status === 'SCHEDULED' ? 'Agendado' : ''}
                                        </span>
                                    </div>

                                    <div className={styles["appointment-actions"]}>
                                        <button type="button">Ver detalhes</button>
                                        <button type="button">Reagendar</button>
                                    </div>
                                </article>
                            ))
                    }
                </div>
            </section>

            <section className={styles["appointments-section"]}>

                <div className={styles["section-header"]}>
                    <h2>Histórico</h2>
                </div>

                <div className={styles["appointments-list"]}>

                    <article className={styles["appointment-card"]}>
                        <div className={styles["appointment-date"]}>
                            <span>28</span>
                            <small>SET</small>
                        </div>

                        <div className={styles["appointment-info"]}>
                            <h3>Dr. João Silva</h3>
                            <p>28/09/2026 às 15:00</p>
                            <span className={styles["appointment-status"]}>
                                Concluída
                            </span>
                        </div>

                        <div className={styles["appointment-actions"]}>
                            <button type="button">Ver detalhes</button>
                        </div>
                    </article>

                </div>
            </section>

        </main>
    )
}

