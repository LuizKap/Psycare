import { Link } from "react-router";
import styles from './GuestSidebar.module.css'
import type { SidebarProps } from "../../../types";

function GuestSidebar({ isOpen }: SidebarProps) {

    return (

        <div className={`${styles.side} ${isOpen ? styles.open : ''}`}>

            <Link to='/register' className={styles.register}>Registrar-se</Link>
            <Link to='/login' className={styles.login}>Login</Link>

        </div>
    )
}

export default GuestSidebar