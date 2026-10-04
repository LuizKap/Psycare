import { ShieldAlert } from "lucide-react"
import styles from "./Unauthorized.module.css"

function Unauthorized() {
    return (
        <main className={styles.container}>
            <section className={styles.card}>
                <div className={styles.icon}>
                    <ShieldAlert size={36} />
                </div>

                <h1 className={styles.title}>
                    Acesso não autorizado
                </h1>

                <p className={styles.message}>
                    Você não tem permissão para acessar esta página.
                </p>
            </section>
        </main>
    )
}

export default Unauthorized