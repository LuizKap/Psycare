
import dayjs from '../../../../../utils/dayjs'
import { useState } from "react";
import styles from "./CreateAppointment.module.css";
import createCalendar from './util/createCalendar';
import type { Dayjs } from 'dayjs';
import { useTimes } from '../../../../../hooks/useTimes';


export function CreateAppointment() {

    const [displayedMonth, setDisplayedMonth] = useState(dayjs().tz('America/Sao_Paulo'))
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const { availableTimes } = useTimes(selectedDay)
    const calendar = createCalendar(displayedMonth)

    const morningTimes = availableTimes.filter(time => Number(time.slice(0, 2)) < 12)

    const afternoonTimes = availableTimes.filter(time => {
        const hour = Number(time.slice(0, 2))
        return hour >= 12 && hour < 18
    })

    const nightTimes = availableTimes.filter(time => Number(time.slice(0, 2)) >= 18)

    return (
        <main className={styles["create-appointment-page"]}>
            <header className={styles["page-header"]}>
                <span className={styles["eyebrow"]}>
                    CUIDE DE VOCÊ
                </span>

                <h1>Agendar consulta</h1>

                <p>
                    Reserve um momento para cuidar da sua saúde emocional.
                    Escolha a data e o horário que funcionam melhor para você.
                </p>
            </header>

            <div className={styles["appointment-layout"]}>
                <section className={styles["booking-card"]}>
                    <div className={styles["section-heading"]}>
                        <span className={styles["step-number"]}>01</span>

                        <div>
                            <h2>Escolha a data</h2>
                            <p>Selecione o melhor dia para sua consulta.</p>
                        </div>
                    </div>

                    <div className={styles["calendar-placeholder"]}>
                        <div className={styles["calendar-header"]}>
                            <button
                                type="button"
                                className={styles["calendar-arrow"]}
                                aria-label="Mês anterior"

                                onClick={() => {
                                    setDisplayedMonth((displayedMonth) =>
                                        displayedMonth.subtract(1, 'month'))
                                }}
                            >
                                <img src="/createAppointment/leftArrow.svg" alt="" />
                            </button>

                            <h3>{displayedMonth.format('MMMM YYYY')}</h3>

                            <button
                                type="button"
                                className={styles["calendar-arrow"]}
                                aria-label="Próximo mês"

                                onClick={() =>
                                    setDisplayedMonth((displayedMonth) =>
                                        displayedMonth.add(1, 'month'))
                                }
                            >
                                <img src="/createAppointment/rightArrow.svg" alt="" />
                            </button>
                        </div>

                        <div className={styles["calendar-grid"]}>
                            <span>Dom</span>
                            <span>Seg</span>
                            <span>Ter</span>
                            <span>Qua</span>
                            <span>Qui</span>
                            <span>Sex</span>
                            <span>Sáb</span>


                            {calendar.previousMonthDaysArray.map((day) => (
                                <span
                                    className={styles["calendar-muted"]}
                                    key={day}
                                >
                                    {day}
                                </span>
                            ))}


                            {calendar.monthDaysArray.map((day) => (
                                <button type="button" key={day}
                                    className={
                                        selectedDay?.format('YYYY-MM-DD') ===
                                            displayedMonth.date(day).format('YYYY-MM-DD')
                                            ? styles["calendar-day-selected"]
                                            : ""
                                    }
                                    onClick={() => {

                                        //Pro usuário nao clicar novamente no mesmo botão
                                        //e não limpar o horário escolhido
                                        if (selectedDay?.date() === day) return

                                        setSelectedDay(displayedMonth.date(day))
                                        setSelectedTime(null)
                                    }}
                                >
                                    {day}
                                </button>
                            ))}


                        </div>

                        <div className={styles["calendar-legend"]}>
                            <span className={styles["legend-dot"]} />
                            Dias disponíveis para agendamento
                        </div>
                    </div>
                </section>

                <section className={styles["booking-card"]}>
                    <div className={styles["section-heading"]}>
                        <span className={styles["step-number"]}>02</span>

                        <div>
                            <h2>Escolha o horário</h2>
                            <p>Selecione um dos horários disponíveis.</p>
                        </div>
                    </div>

                    <div className={styles["selected-date"]}>
                        <span className={styles["date-icon"]}>▦</span>

                        <div>
                            <small>Data selecionada</small>
                            <p>Selecione uma data no calendário</p>
                        </div>
                    </div>

                    <div className={styles["period-heading"]}>
                        <span>Manhã</span>
                        <small>09:00 - 11:00</small>
                    </div>

                    <div className={styles["time-grid"]}>
                        {morningTimes.map(time => (
                            <button type="button"
                                className={selectedTime === time ? styles["selected-time"] : ""}
                                key={time}
                                onClick={() => setSelectedTime(time)}>
                                {time}
                            </button>
                        ))}
                    </div>

                    <div className={styles["period-heading"]}>
                        <span>Tarde</span>
                        <small>12:00 - 17:00</small>
                    </div>

                    <div className={styles["time-grid"]}>

                        {afternoonTimes.map(time => (
                            <button type="button"
                                className={selectedTime === time ? styles["selected-time"] : ""}
                                key={time}
                                onClick={() => setSelectedTime(time)}>
                                {time}
                            </button>
                        ))}

                    </div>

                    <div className={styles["period-heading"]}>
                        <span>Noite</span>
                        <small>18:00 - 21:00</small>
                    </div>

                    <div className={styles["time-grid"]}>
                        {nightTimes.map(time => (
                            <button type="button"
                                className={selectedTime === time ? styles["selected-time"] : ""}
                                key={time}
                                onClick={() => setSelectedTime(time)}>
                                {time}
                            </button>
                        ))}
                    </div>

                    <p className={styles["availability-note"]}>
                        Os horários serão liberados após a seleção de uma data.
                    </p>
                </section>
            </div>

            <section className={styles["confirmation-card"]}>
                <div className={styles["confirmation-info"]}>
                    <span className={styles["confirmation-icon"]}>♡</span>

                    <div>
                        <h2>Seu momento de cuidado</h2>
                        <p>
                            Confira a data e o horário antes de confirmar
                            seu agendamento.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className={styles["confirm-button"]}
                    disabled={!selectedDay || !selectedTime}
                >
                    Confirmar agendamento
                    <span aria-hidden="true">→</span>
                </button>
            </section>
        </main>
    );
}
