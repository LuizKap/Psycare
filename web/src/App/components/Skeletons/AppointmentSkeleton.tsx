
import styles from './AppointmentSkeleton.module.css'

export function AppointmentSkeleton() {
    return (
        <div className={styles.skeleton} aria-label="Carregando próxima consulta">
            <div className={styles.icon} />
            <div className={styles.content}>
                <div className={`${styles.line} ${styles.title}`} />
                <div className={`${styles.line} ${styles.date}`} />
                <div className={`${styles.line} ${styles.button}`} />
            </div>
        </div>
    )
}