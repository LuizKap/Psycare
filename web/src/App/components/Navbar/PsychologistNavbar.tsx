import { NavLink } from "react-router"
import styles from "./Navbar.module.css"
import type { NavbarProps } from "../../../types"

function PsychologistNavbar({ toggleSidebar }: NavbarProps) {

    return (
        <header className={styles.header}>

            <nav className={styles.nav}>

                <div className={styles.logo}>
                    Psycare
                </div>

                <div className={styles['nav-links-container']}>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/appointments"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }
                    >
                        Consultas
                    </NavLink>

                    <NavLink
                        to="/patients"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }
                    >
                        Pacientes
                    </NavLink>

                    <NavLink
                        to="/agenda"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }
                    >
                        Minha agenda
                    </NavLink>

                    <NavLink
                        to="/psychologist/me"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }
                    >
                        Meu perfil
                    </NavLink>

                </div>

                <img
                    src="/profile/user.svg"
                    alt="profile-image"
                    className={styles['profile-img']}
                    onClick={toggleSidebar}
                />

            </nav>

        </header>
    )
}

export default PsychologistNavbar