import { NavLink } from "react-router";
import type { NavbarProps } from "../../../types";
import styles from "./Navbar.module.css"



export function GuestNavbar({ toggleSidebar }: NavbarProps) {


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
                        to="/aboutPsychologist"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }
                    >
                        Sobre o Psicólogo
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }>
                            Entrar
                    </NavLink>

                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `${styles['nav-link']} ${isActive ? styles.active : ''}`
                        }>
                            Criar Conta
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

export default GuestNavbar
