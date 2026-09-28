import { NavLink, Outlet } from "react-router"
import styles from "./Login.module.css"


export function Login() {

    return (

        <section className={styles['login-container']}>

            <div className={styles.introduction}>

                <h1>Psycare</h1>
                <h2>Bem-vindo de Volta!</h2>
                <p>Continue a sua jornada de cuidado.</p>

            </div>

            <div className={styles['switch-role']}>

                <NavLink
                    to='patient'
                    className={({ isActive }) => `${styles['switch-link']} ${isActive ? styles.active : ''}`}
                >
                    Sou paciente
                </NavLink>

                <NavLink
                    to='psychologist'
                    className={({ isActive }) => `${styles['switch-link']} ${isActive ? styles.active : ''}`}
                >
                    Sou psicólogo
                </NavLink>

            </div>

            <div className={styles['login-content']}>
                <Outlet />
            </div>

        </section>
    )
}