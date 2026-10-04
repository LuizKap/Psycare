import styles from "./Loading.module.css"

export function Loading() {
    return (
        <main className={styles.container}>
            <div className={styles.loader}></div>

            <p className={styles.text}>
                Carregando...
            </p>
        </main>
    )
}