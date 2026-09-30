
import { Link } from 'react-router'
import { useAuth } from '../../../../../hooks/useAuth'
import styles from './Psychologist.home.module.css'
import { useEffect, useState } from 'react'
import { appointment_api } from '../../../../../fetch/appointment.api'
import type { NextAppointment } from '../../../../../types'
import { toast } from 'sonner'
import dayjs from '../..//../../../utils/dayjs'


export function PsychologistHome() {

    const auth = useAuth()
    const [count, setCount] = useState<number>(0)
    const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null)

    useEffect(() => {
        async function loadDashboard() {

            try {
                const [todayCountAppointments, nextAppointment] = await Promise.all([
                    appointment_api.countTodayAppointments(),
                    appointment_api.getNextAppointment()
                ])

                setCount(todayCountAppointments)
                setNextAppointment(nextAppointment)
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Erro ao carregar algumas informações')
            }
        }

        loadDashboard()
    }, [])

    return (
        <>
            <section className={styles.introduction}>
                <h1>Bem vindo Dr. {auth.profile?.name}!</h1>
            </section>

            <section className={styles.info}>

                <article className={styles['card-info']}>
                    <div>
                        <img src="/profile/appointments.svg" alt="" />
                        <h2>Consultas hoje</h2>
                    </div>
                    <span>{count === 0 ? 'Nenhuma consulta' : `${count} consultas`}</span>
                    <Link to='/list/appointments'>
                        Lista de Consultas
                    </Link>
                </article>

                <article className={styles['card-info']}>
                    <div>
                        <img src="/profile/people.svg" alt="" />
                        <h2>Pacientes Ativos</h2>
                    </div>

                    <span>numero</span>

                    <Link to='/list/patient'>
                        Lista de pacientes
                    </Link>
                </article>

                <article className={styles['card-info']}>
                    <div>
                        <img src="/profile/next-appointment.svg" alt="" />
                        <h2>Próxima consulta</h2>
                    </div>

                    <span>
                        {nextAppointment ?
                            dayjs(nextAppointment.starts_at).tz('America/Sao_Paulo').format('HH:mm')
                            :
                            'Não há consultas'}
                    </span>
                    <p>
                        {nextAppointment ?
                            nextAppointment.patient.name
                            :
                            ''}
                    </p>
                </article>
            </section>

            <section className={styles['next-appointments']}>
                <h2>Próximos atendimentos</h2>

                <div className={styles['appointments-table']}>

                    <div className={styles['table-header']}>
                        <h3>Horário</h3>
                        <h3>Paciente</h3>
                        <h3>Status</h3>
                    </div>

                    <div className={styles['table-row']}>
                        <span>14:00</span>
                        <span>João Silva</span>
                        <span>Agendada</span>
                    </div>

                    <div className={styles['table-row']}>
                        <span>15:00</span>
                        <span>Maria Santos</span>
                        <span>Agendada</span>
                    </div>

                    <div className={styles['table-row']}>
                        <span>16:00</span>
                        <span>Pedro Oliveira</span>
                        <span>Agendada</span>
                    </div>

                </div>
            </section>
        </>
    )
}