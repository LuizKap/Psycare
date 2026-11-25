import type { RescheduleAppointmentsProps } from "../../../../../types"
import styles from "./RescheduleAppointment.module.css"
import dayjs from "../../../../../utils/dayjs"
import { useTimes } from "../../../../../hooks/useTimes"
import { useState } from "react"
import type { Dayjs } from "dayjs"
import { useRescheduleAppointment } from "../../../../../hooks/useRescheduleAppointment"


export function RescheduleAppointment({
    isOpen,
    onClose,
    appointment
}: RescheduleAppointmentsProps) {


    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const { loadingReschedule, handleRescheduleAppointment } = useRescheduleAppointment()
    const { errorTimes, loadingTimes, afternoonTimes, morningTimes, nightTimes } = useTimes(selectedDay)

    if (!isOpen || !appointment) return null

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
        >
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="reschedule-title"
                onClick={(ev) => ev.stopPropagation()}
            >
                <header className={styles["modal-header"]}>
                    <div>
                        <span className={styles.eyebrow}>
                            MINHAS CONSULTAS
                        </span>

                        <h2 id="reschedule-title">
                            Reagendar consulta
                        </h2>

                        <p>
                            Escolha uma nova data e horário para sua consulta.
                        </p>
                    </div>

                    <button
                        className={styles["close-button"]}
                        type="button"
                        aria-label="Fechar"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </header>

                <div className={styles["modal-content"]}>

                    <section className={styles["current-appointment"]}>
                        <span>Consulta atual</span>

                        <strong>
                            {dayjs(appointment.starts_at).format("DD/MM/YYYY [às] HH:mm")}
                        </strong>
                    </section>

                    <div className={styles["date-section"]}>
                        <h3>Nova data</h3>

                        <label className={styles["date-field"]}>
                            <span>Selecione uma data</span>

                            <input
                                type="date"
                                name="new-date"
                                onChange={(ev) => {
                                    const day = dayjs(ev.target.value)
                                    setSelectedDay(day)

                                }}
                            />
                        </label>
                    </div>

                    <div className={styles["time-section"]}>
                        <h3>Horários disponíveis</h3>

                        <p>
                            Selecione um horário para sua consulta.
                        </p>

                        {loadingTimes && (
                            <p>Carregando horários...</p>
                        )}

                        {!loadingTimes && !errorTimes && (
                            <div className={styles["time-slots"]}>

                                {/* Manhã */}
                                {morningTimes.length > 0 && (
                                    <div className={styles["time-period"]}>
                                        <h4>Manhã</h4>

                                        <div className={styles["time-options"]}>
                                            {morningTimes.map(time => (
                                                <button
                                                    key={time}
                                                    type="button"

                                                    className={`
                                                        ${styles["time-button"]}
                                                     ${selectedTime === time ? styles["selected"] : ""}`}

                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tarde */}
                                {afternoonTimes.length > 0 && (
                                    <div className={styles["time-period"]}>
                                        <h4>Tarde</h4>

                                        <div className={styles["time-options"]}>
                                            {afternoonTimes.map(time => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    className={`
                                                        ${styles["time-button"]}
                                                     ${selectedTime === time ? styles["selected"] : ""}`}

                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Noite */}
                                {nightTimes.length > 0 && (
                                    <div className={styles["time-period"]}>
                                        <h4>Noite</h4>

                                        <div className={styles["time-options"]}>
                                            {nightTimes.map(time => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    className={`
                                                        ${styles["time-button"]}
                                                     ${selectedTime === time ? styles["selected"] : ""}`}

                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                        {errorTimes && (
                            <p>Não foi possível carregar os horários.</p>
                        )}
                    </div>

                    <footer className={styles["modal-footer"]}>
                        <button
                            className={styles["cancel-button"]}
                            type="button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            className={styles["confirm-button"]}
                            type="button"
                            disabled={loadingReschedule || !selectedDay || !selectedTime}
                            onClick={async () => {
                                if (selectedDay && selectedTime) {
                                    await handleRescheduleAppointment(selectedDay, selectedTime, appointment.id)
                                    onClose()
                                }
                            }}
                        >
                            Confirmar reagendamento
                        </button>
                    </footer>
                </div>
            </section>
        </div>
    )
}