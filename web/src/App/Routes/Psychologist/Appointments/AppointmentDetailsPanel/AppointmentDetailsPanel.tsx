import type { AppointmentDetailsPanelProps } from "../../../../../types"
import dayjs from "../../../../../utils/dayjs"
import Skeleton from "react-loading-skeleton"
import styles from "./AppointmentDetailsPanel.module.css"


export function AppointmentDetailsPanel({
    appointment,
    isOpen,
    onClose
}: AppointmentDetailsPanelProps) {

    return (
        <div
            className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
            aria-hidden={!isOpen}
        >
            <button
                className={styles.overlay}
                type="button"
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                aria-label="Fechar detalhes da consulta"
            />

            <aside
                className={styles.panel}
                role="dialog"
                aria-modal={isOpen}
                aria-labelledby="appointment-details-title"
            >
                <header className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>
                            GERENCIAMENTO
                        </span>

                        <h2 id="appointment-details-title">
                            Detalhes da consulta
                        </h2>
                    </div>

                    <button
                        className={styles.closeButton}
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar painel"
                    >
                        x
                    </button>
                </header>

                {!appointment ? (
                    <div className={styles.content}>
                        <Skeleton count={4} />
                    </div>
                ) : (
                    <div className={styles.content}>
                        <section className={styles.patientSection}>
                            <div className={styles.avatar}>
                                {appointment.patient.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>
                                <span className={styles.label}>
                                    PACIENTE
                                </span>

                                <h3>{appointment.patient.name}</h3>
                            </div>
                        </section>

                        <section className={styles.detailsSection}>
                            <h3>Informações</h3>

                            <div className={styles.detailItem}>
                                <span className={styles.label}>
                                    Data e horário
                                </span>

                                <p>
                                    {dayjs(appointment.starts_at)
                                        .tz("America/Sao_Paulo")
                                        .format("DD/MM/YYYY [às] HH:mm")}
                                </p>
                            </div>

                            <div className={styles.detailItem}>
                                <span className={styles.label}>
                                    Data de criação
                                </span>

                                <p>
                                    {dayjs(appointment.created_at)
                                        .tz("America/Sao_Paulo")
                                        .format("DD/MM/YYYY [às] HH:mm")}
                                </p>
                            </div>

                            <div className={styles.detailItem}>
                                <span className={styles.label}>
                                    Status
                                </span>

                                <span
                                    className={`${styles.status} ${appointment.status === "SCHEDULED"
                                        ? styles.scheduled
                                        : appointment.status === "COMPLETED"
                                            ? styles.completed
                                            : styles.cancelled
                                        }`}
                                >
                                    {appointment.status === "SCHEDULED"
                                        ? "Agendada"
                                        : appointment.status === "COMPLETED"
                                            ? "Concluída"
                                            : "Cancelada"}
                                </span>
                            </div>
                        </section>

                        <section className={styles.notesSection}>
                            <div className={styles.notesHeader}>
                                <div>
                                    <h3>Notas da consulta</h3>

                                    <p>
                                        Registro e observações do atendimento.
                                    </p>
                                </div>
                            </div>

                            {appointment.notes ? (
                                <div className={styles.existingNotes}>
                                    <span className={styles.label}>
                                        NOTAS REGISTRADAS
                                    </span>

                                    <p>{appointment.notes}</p>
                                </div>
                            ) : (
                                <p className={styles.emptyNotes}>
                                    Nenhuma nota registrada nesta consulta.
                                </p>
                            )}

                            <label
                                className={styles.label}
                                htmlFor="appointment-notes"
                            >
                                Editar notas
                            </label>

                            <textarea
                                id="appointment-notes"
                                className={styles.notesTextarea}
                                defaultValue={appointment.notes ?? ""}
                                placeholder="Escreva suas observações..."
                                rows={6}
                            />

                            <button
                                className={styles.saveButton}
                                type="button"
                                disabled
                            >
                                Salvar notas
                            </button>
                        </section>
                    </div>
                )}
            </aside>
        </div>
    )
}