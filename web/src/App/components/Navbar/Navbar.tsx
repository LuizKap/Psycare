import { NavLink } from "react-router"
import "./Navbar.css"
import type { NavbarProps } from "../../types"


function Navbar({ toggleSidebar }: NavbarProps) {

    return (
        <header>

            <nav>
                <div className="logo">Psycare</div>

                <div className="nav-links-container">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/appointments" className="nav-link">Minhas consultas</NavLink>
                    <NavLink to="/mood" className="nav-link">Diário do humor</NavLink>
                    <NavLink to="/journey" className="nav-link">Jornada do campeão</NavLink>
                    <NavLink to="/about" className="nav-link">Sobre o Psicólogo</NavLink>
                </div>


                <img src="/profile/user.svg" alt="profile-image"
                    className="profile-img"
                    onClick={toggleSidebar}
                />

            </nav>

        </header>
    )
}

export default Navbar