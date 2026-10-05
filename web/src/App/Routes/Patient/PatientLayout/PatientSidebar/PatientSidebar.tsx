import { Link } from "react-router"

import { useAppointment } from "../../../../../hooks/useAppointment"

import type { SidebarProps } from "../../../../../types"

import dayjs from "../../../../../utils/dayjs"
import { formatAppointmentDate } from "../../../../../utils/formatAppointmentDate"

import styles from "./PatientSidebar.module.css"
import { usePatient } from "../../../../../hooks/usePatient"


function PatientSidebar({ isOpen }: SidebarProps) {

    const profile = usePatient()
    const appointments_data = useAppointment()

    const patient = profile.patient
    const appointments = appointments_data.appointments
    

    return (
        <div className={`${styles.side} ${isOpen ? styles.open : ""}`}>

            <section className={styles["side-introduction"]}>

                <h2 className={styles["side-username"]}>
                    Olá {patient.name}
                </h2>

                <img
                    src="/profile/user.svg"
                    alt="usuario-imagem"
                />

                <p>
                    Paciente desde{" "}
                    {dayjs(patient.created_at).format("MMM [de] YYYY")}
                </p>

                <Link
                    to="/patient/me"
                    className={styles["profile-link"]}
                >
                    Editar Perfil
                </Link>

            </section>


            <section className={styles["side-appointment"]}>

                <img
                    src="/profile/appointments.svg"
                    alt="Calendário-imagem"
                />

                <h3>Próxima Consulta</h3>

                <p>
                    {appointments[0]
                        ? formatAppointmentDate(appointments[0].starts_at)
                        : "Nenhuma consulta agendada"}
                </p>

                <Link
                    to={
                        appointments[0]
                            ? "/appointments/reschedule"
                            : "/appointments/create"
                    }
                    className={styles["reschedule-link"]}
                >
                    {appointments[0]
                        ? "Reagendar"
                        : "Agendar uma consulta"}
                </Link>

            </section>


            <section className={styles["side-menu"]}>

                <Link
                    to="/"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/home.svg" alt="" />
                    <span>Home</span>
                </Link>

                <Link
                    to="/appointments"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/appointments.svg" alt="" />
                    <span>Minhas consultas</span>
                </Link>

                <Link
                    to="/appointments/create"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/new-appointment.svg" alt="" />
                    <span>Agendar nova consulta</span>
                </Link>

                <Link
                    to="/mood"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/mood.svg" alt="" />
                    <span>Diário do humor</span>
                </Link>

                <Link
                    to="/logout"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/logout.svg" alt="" />
                    <span>Sair</span>
                </Link>

            </section>

        </div>
    )
}

export default PatientSidebar