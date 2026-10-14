import styles from "./InlineError.module.css";

interface InlineErrorProps {
    message: string;
    onRetry: () => void | Promise<void>;
}

export function InlineError({ message, onRetry }: InlineErrorProps) {
    return (
        <div className={styles.error}>
            <p>{message}</p>

            <button
                type="button"
                onClick={() => void onRetry()}
                className={styles.retry}
            >
                Tentar novamente
            </button>
        </div>
    );
}