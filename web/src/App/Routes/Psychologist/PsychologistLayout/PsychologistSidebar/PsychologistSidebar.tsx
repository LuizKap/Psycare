import { Link } from "react-router"

import type { SidebarProps } from "../../../../../types"

import dayjs from "../../../../../utils/dayjs"

import styles from "./PsychologistSidebar.module.css"
import { usePsychologist } from "../../../../../hooks/usePsychologist"


function PsychologistSidebar({ isOpen }: SidebarProps) {

    const profile = usePsychologist()
    const psychologist = profile.psychologist

    return (
        <div className={`${styles.side} ${isOpen ? styles.open : ""}`}>

            <section className={styles["side-introduction"]}>

                <h2 className={styles["side-username"]}>
                    Olá Dr. {psychologist.name}
                </h2>

                <img
                    src="/profile/user.svg"
                    alt="usuario-imagem"
                />

                <p>
                    Psicólogo desde{" "}
                    {dayjs(psychologist.created_at).format("MMM [de] YYYY")}

                </p>

                <Link
                    to="/psychologist/me"
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

                <h3>Próximo Atendimento</h3>

                <p>
                    Nenhum atendimento agendado
                </p>

                <Link
                    to="/appointments"
                    className={styles["reschedule-link"]}
                >
                    Ver consultas
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
                    <span>Consultas</span>
                </Link>

                <Link
                    to="/patients"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/user.svg" alt="" />
                    <span>Pacientes</span>
                </Link>

                <Link
                    to="/agenda"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/new-appointment.svg" alt="" />
                    <span>Minha agenda</span>
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

export default PsychologistSidebar