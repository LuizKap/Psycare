import { Link, useNavigate } from "react-router"

import { useScheduledAppointments } from "../../../../../hooks/useScheduledAppointments"

import { ApiError, type SidebarProps } from "../../../../../types"

import dayjs from "../../../../../utils/dayjs"
import { formatAppointmentDate } from "../../../../../utils/formatAppointmentDate"

import styles from "./PatientSidebar.module.css"
import { usePatient } from "../../../../../hooks/usePatient"
import { toast } from "sonner"
import { useAuth } from "../../../../../hooks/useAuth"
import { ErrorState } from "../../../../components/Error/Error"
import { Loading } from "../../../../components/Loading/Loading"
import { InlineError } from "../../../../components/Error/InlineError"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"


function PatientSidebar({ isOpen }: SidebarProps) {

    const auth = useAuth()

    const {
        patient,
        loading: patientLoading,
        error: patientError,
        refreshPatient
    } = usePatient()

    const {
        appointments,
        loading: appointmentsLoading,
        error: appointmentsError,
        refreshScheduledAppointments
    } = useScheduledAppointments()


    const navigate = useNavigate()



    async function handleLogout() {

        try {

            const message = await auth.logout()
            navigate('/')
            toast.success(message)

        } catch (error) {

            toast.error(error instanceof ApiError ? error.message : 'Erro externo')

        }

    }

    if (patientLoading) {
        return <Loading />
    }

    if (patientError || !patient) {
        return (
            <ErrorState
                message="Não foi possível carregar seus dados"
                onRetry={refreshPatient}
            />
        )
    }


    return (

        <SkeletonTheme
            baseColor="#A8C5B4"
            highlightColor="#F0F7F2"
        >
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

                    {appointmentsLoading ? (
                        <Skeleton count={2} width={200}/>
                    ) : appointmentsError ? (
                        <InlineError
                            message="Não foi possível carregar a consulta."
                            onRetry={refreshScheduledAppointments}
                        />
                    ) : (
                        <>
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
                        </>
                    )}
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
                        to="/patient/appointments"
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

                    <button type="button" onClick={handleLogout}
                        className={styles["side-menu-link"]}>

                        <img src="/profile/logout.svg" alt="" />

                        <span>Sair</span>
                    </button>

                </section>

            </div >
        </SkeletonTheme>
    )
}

export default PatientSidebar