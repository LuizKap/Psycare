import { NavLink, Outlet } from "react-router";
import "./Register.css"

function Register() {

    return (

        <section className="register-container">

            <div className="introduction">

                <h1>Psycare</h1>
                <p>Bem-vindo ao Psycare</p>
                <h2>Crie sua conta e comece sua jornada de cuidado</h2>

            </div>

            <div className="switch-role">

                <NavLink to='patient'>Sou paciente</NavLink>

                <NavLink to='psychologist'>Sou psicólogo</NavLink>

            </div>

            <Outlet />

        </section>
    )


}

export default Register