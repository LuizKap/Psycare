import type { AppointmentDetailsPanelProps } from "../../../../../types"
import dayjs from "../../../../../utils/dayjs"
import Skeleton from "react-loading-skeleton"
import styles from "./AppointmentDetailsPanel.module.css"
import { useUpdateNotes } from "../../../../../hooks/useUpdateNotes"
import { useEffect, useRef, useState } from "react"



export function AppointmentDetailsPanel({
    selectedAppointment,
    setSelectedAppointment,
    onNotesSaved,
    isOpen,
    onClose
}: AppointmentDetailsPanelProps) {

    const { handleUpdateNotes, loading } = useUpdateNotes()

    const [updatedNote, setUpdatedNote] = useState<string>(selectedAppointment?.notes ?? "")
    const saveBtnRef = useRef<HTMLButtonElement>(null)

    console.log(updatedNote)

    //preenche updatedNote ao mudar de appointment
    useEffect(() => {

        setUpdatedNote(selectedAppointment?.notes ?? "")

    }, [selectedAppointment])


    // Bloqueia o scroll do body enquanto o painel estiver aberto
    useEffect(() => {
        if (!isOpen) return

        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

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
                        onClick={() => {
                            onClose()
                        }}
                        aria-label="Fechar painel"
                    >
                        x
                    </button>
                </header>

                {!selectedAppointment ? (
                    <div className={styles.content}>
                        <Skeleton count={4} />
                    </div>
                ) : (
                    <div className={styles.content} key={selectedAppointment.id}>
                        <section className={styles.patientSection}>
                            <div className={styles.avatar}>
                                {selectedAppointment.patient.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>
                                <span className={styles.label}>
                                    PACIENTE
                                </span>

                                <h3>{selectedAppointment.patient.name}</h3>
                            </div>
                        </section>

                        <section className={styles.detailsSection}>
                            <h3>Informações</h3>

                            <div className={styles.detailItem}>
                                <span className={styles.label}>
                                    Data e horário
                                </span>

                                <p>
                                    {dayjs(selectedAppointment.starts_at)
                                        .tz("America/Sao_Paulo")
                                        .format("DD/MM/YYYY [às] HH:mm")}
                                </p>
                            </div>

                            <div className={styles.detailItem}>
                                <span className={styles.label}>
                                    Data de criação
                                </span>

                                <p>
                                    {dayjs(selectedAppointment.created_at)
                                        .tz("America/Sao_Paulo")
                                        .format("DD/MM/YYYY [às] HH:mm")}
                                </p>
                            </div>

                            <div className={styles.detailItem}>
                                <span className={styles.label}>
                                    Status
                                </span>

                                <span
                                    className={`${styles.status} ${selectedAppointment.status === "SCHEDULED"
                                        ? styles.scheduled
                                        : selectedAppointment.status === "COMPLETED"
                                            ? styles.completed
                                            : styles.cancelled
                                        }`}
                                >
                                    {selectedAppointment.status === "SCHEDULED"
                                        ? "Agendada"
                                        : selectedAppointment.status === "COMPLETED"
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

                            {selectedAppointment.notes ? (
                                <div className={styles.existingNotes}>
                                    <span className={styles.label}>
                                        NOTAS REGISTRADAS
                                    </span>

                                    <p>{selectedAppointment.notes}</p>
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
                                defaultValue={selectedAppointment.notes ?? ""}
                                placeholder="Escreva suas observações..."
                                rows={6}
                                onChange={(ev) => {
                                    setUpdatedNote(ev.target.value)
                                    if (saveBtnRef.current) {
                                        saveBtnRef.current.disabled = ev.target.value === selectedAppointment.notes
                                    }
                                }}
                            />

                            <button
                                className={styles.saveButton}
                                type="button"
                                ref={saveBtnRef}
                                disabled={updatedNote === selectedAppointment.notes || loading}
                                onClick={async () => {
                                    const appointment = await handleUpdateNotes(selectedAppointment.id, updatedNote)
                                    setSelectedAppointment(appointment)
                                    onNotesSaved()
                                }}
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