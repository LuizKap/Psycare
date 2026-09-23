import { Link } from "react-router";
import './LoggedSidebar.css'
import type { SidebarProps } from "../../../types";

function LoggedSidebar({ isOpen }: SidebarProps) {

    return (

        <div className={`side ${isOpen ? 'open' : ''}`}>

            <section className="side-introduction">

                <h2 className="side-username">Olá usuário</h2>
                <img src="/profile/user.svg" alt="usuario-imagem" />
                <p>Paciente desde Abr/2023</p>
                <Link to='/patient/me' className="profile-link">Editar Perfil</Link>

            </section>

            <section className="side-appointment">

                <img src="/profile/appointments.svg" alt="Calendário-imagem" />
                <h3>Próxima Consulta</h3>
                <p>Quinta-feira, 15:00h</p>
                <Link to='/appointments/reschedule' className="reschedule-link">Reagendar</Link>

            </section>

            <section className="side-menu">

                <Link to='/' className="side-menu-link" >
                    <img src="/profile/home.svg" alt="" />
                    <span>Home</span>
                </Link>

                <Link to='/appointments' className="side-menu-link">
                    <img src="/profile/appointments.svg" alt="" />
                    <span>Minhas consultas</span>
                </Link>

                <Link to='/appointments/create' className="side-menu-link">
                    <img src="/profile/new-appointment.svg" alt="" />
                    <span>Agendar nova consulta</span>
                </Link>

                <Link to='/mood' className="side-menu-link">
                    <img src="/profile/mood.svg" alt="" />
                    <span>Diário do humor</span>
                </Link>

                <Link to='/logout' className="side-menu-link">
                    <img src="/profile/logout.svg" alt="" />
                    <span>Sair</span>
                </Link>

            </section>

        </div>
    )
}

export default LoggedSidebar