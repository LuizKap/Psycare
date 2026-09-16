import { NavLink } from "react-router"
import "./Navbar.css"

function Navbar() {
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

                <div className="profile">
                    <img src="/profile/user.png" alt="profile-image" className="profile-img"/>
                    <img src="/profile/down-arrow.svg" alt="" />
                </div>
            </nav>
        </header>
    )
}

export default Navbar