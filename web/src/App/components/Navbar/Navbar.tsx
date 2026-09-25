import { NavLink } from "react-router"
import styles from "./Navbar.module.css"
import type { NavbarProps } from "../../types"

function Navbar({ toggleSidebar }: NavbarProps) {

    return (
        <header className={styles.header}>

            <nav className={styles.nav}>

                <div className={styles.logo}>Psycare</div>

                <div className={styles['nav-links-container']}>

                    <NavLink
                        to="/"
                        className={({ isActive }) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/appointments"
                        className={({ isActive }) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                    >
                        Minhas consultas
                    </NavLink>

                    <NavLink
                        to="/mood"
                        className={({ isActive }) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                    >
                        Diário do humor
                    </NavLink>

                    <NavLink
                        to="/journey"
                        className={({ isActive }) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                    >
                        Jornada do campeão
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) => `${styles['nav-link']} ${isActive ? styles.active : ''}`}
                    >
                        Sobre o Psicólogo
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

export default Navbar