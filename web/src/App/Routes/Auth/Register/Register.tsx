import { NavLink, Outlet } from "react-router";
import styles from "./Register.module.css"

function Register() {

    return (

        <section className={styles['register-container']}>

            <div className={styles.introduction}>

                <h1>Psycare</h1>
                <p>Bem-vindo ao Psycare</p>
                <h2>Crie sua conta e comece sua jornada de cuidado</h2>

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

            <div className={styles['register-content']}>
                <Outlet />
            </div>

        </section>
    )


}

export default Register