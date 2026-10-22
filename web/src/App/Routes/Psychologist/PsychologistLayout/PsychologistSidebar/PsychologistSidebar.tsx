import { Link } from "react-router";
import { toast } from "sonner";

import {
    ApiError,
    type SidebarProps
} from "../../../../../types";

import dayjs from "../../../../../utils/dayjs";
import styles from "./PsychologistSidebar.module.css";

import { usePsychologist } from "../../../../../hooks/usePsychologist";

import { useAuth } from "../../../../../hooks/useAuth";

import { InlineError } from "../../../../components/Error/InlineError";
import { useNextAppointment } from "../../../../../hooks/useNextAppointment";
import Skeleton from "react-loading-skeleton";

function PsychologistSidebar({ isOpen }: SidebarProps) {

    const auth = useAuth();

    const {
        psychologist,
        loading: psychologistLoading,
        error: psychologistError,
        refreshPsychologist
    } = usePsychologist();

    const {
        nextAppointment,
        loading: appointmentLoading,
        error: appointmentError,
        refreshNextAppointment
    } = useNextAppointment();

    async function handleLogout() {
        try {

            const message = await auth.logout();
            toast.success(message);

        } catch (error) {

            toast.error(
                error instanceof ApiError ? error.message : "Erro externo"
            );
        }
    }

    return (
        <div className={`${styles.side} ${isOpen ? styles.open : ""}`}>

            <section className={styles["side-introduction"]}>

                <h2 className={styles["side-username"]}>
                    {psychologistLoading ? "Carregando perfil..." : psychologistError || !psychologist
                        ? "Perfil indisponível"
                        : `Olá, Dr. ${psychologist.name}`}
                </h2>

                <img src="/profile/user.svg" alt="Imagem do usuário" />

                {psychologistLoading ? (<p>Carregando informações do perfil...</p>) : psychologistError || !psychologist ? (
                    <InlineError
                        message="Não foi possível carregar o perfil."
                        onRetry={refreshPsychologist}
                    />
                ) : (
                    <>
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
                    </>
                )}
            </section>

            <section className={styles["side-appointment"]}>
                <img src="/profile/appointments.svg" alt="" />

                <h3>Próximo Atendimento</h3>

                {appointmentLoading ? (<Skeleton count={1} />) : appointmentError ? (
                    <InlineError
                        message="Não foi possível carregar o atendimento."
                        onRetry={refreshNextAppointment}
                    />
                ) : (
                    <p>
                        {nextAppointment ?
                            dayjs(nextAppointment.starts_at).tz("America/Sao_Paulo").format("DD/MM/YYYY [às] HH:mm")
                            : "Nenhum atendimento agendado"}
                    </p>
                )}
                <Link
                    to="/psychologist/appointments"
                    className={styles["reschedule-link"]}
                >
                    Ver consultas
                </Link>
            </section>

            <section className={styles["side-menu"]}>
                <Link to="/" className={styles["side-menu-link"]}>
                    <img src="/profile/home.svg" alt="" />
                    <span>Home</span>
                </Link>

                <Link
                    to="/psychologist/appointments"
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/appointments.svg" alt="" />
                    <span>Consultas</span>
                </Link>

                <Link to="/patients" className={styles["side-menu-link"]}>
                    <img src="/profile/user.svg" alt="" />
                    <span>Pacientes</span>
                </Link>

                <Link to="/agenda" className={styles["side-menu-link"]}>
                    <img src="/profile/new-appointment.svg" alt="" />
                    <span>Minha agenda</span>
                </Link>

                <button
                    type="button"
                    onClick={handleLogout}
                    className={styles["side-menu-link"]}
                >
                    <img src="/profile/logout.svg" alt="" />
                    <span>Sair</span>
                </button>
            </section>
        </div>
    );
}

export default PsychologistSidebar;