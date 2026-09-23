import { Link } from "react-router";
import './GuestSidebar.css'
import type { SidebarProps } from "../../../types";

function GuestSidebar({ isOpen }: SidebarProps) {

    return (

        <div className={`side ${isOpen ? 'open' : ''}`}>

            <Link to='/register' className="register">Registrar-se</Link>
            <Link to='/login' className="login">Login</Link>
    
        </div>
    )
}

export default GuestSidebar