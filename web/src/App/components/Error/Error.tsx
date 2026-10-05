import type { ErrorStateProps } from "../../../types";
import styles from "./Error.module.css";

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className={styles.container}>
            <h2>Algo deu errado</h2>

            <p>{message}</p>

            <button onClick={onRetry}>
                Tentar novamente
            </button>
        </div>
    )
}