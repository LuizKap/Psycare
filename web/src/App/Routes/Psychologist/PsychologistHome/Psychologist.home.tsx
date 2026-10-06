
import { Link } from 'react-router'
import styles from './Psychologist.home.module.css'
import { useEffect, useState } from 'react'
import { appointment_api } from '../../../../fetch/appointment.api'
import { ApiError, type NextAppointment } from '../../../../types'
import { toast } from 'sonner'
import dayjs from '../../../../utils/dayjs'
import { patient_api } from '../../../../fetch/patient.api'
import { usePsychologist } from '../../../../hooks/usePsychologist'


export function PsychologistHome() {

    const profile = usePsychologist()
    const psychologist = profile.psychologist


    const [todayAppointmentsCount, setTodayAppointmentsCount] = useState<number>(0)
    const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null)
    const [upcomingAppointments, setUpcomingAppointments] = useState<NextAppointment[]>([])
    const [patientsCount, setPatientsCount] = useState<number>(0)

    useEffect(() => {
        async function loadDashboard() {

            try {
                const [todayAppointmentsCount, nextAppointment, upcomingAppointments, patientsCount] =
                    await Promise.all
                        ([
                            appointment_api.countTodayAppointments(),
                            appointment_api.getNextAppointment(),
                            appointment_api.getUpcomingAppointments(),
                            patient_api.countPatients()
                        ])

                setTodayAppointmentsCount(todayAppointmentsCount)
                setNextAppointment(nextAppointment)
                setUpcomingAppointments(upcomingAppointments)
                setPatientsCount(patientsCount)

            } catch (error) {
                toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar algumas informações')
            }
        }

        loadDashboard()
    }, [])

    return (
        <>
            <section className={styles.introduction}>

                <h1>Bem vindo Dr. {psychologist.name}!</h1>

            </section>

            <section className={styles.info}>

                <article className={styles['card-info']}>

                    <div>
                        <img src="/profile/appointments.svg" alt="" />
                        <h2>Consultas hoje</h2>
                    </div>

                    <span>{todayAppointmentsCount === 0 ?
                        'Nenhuma consulta' :
                        `${todayAppointmentsCount} consultas`}
                    </span>

                    <Link to='/list/appointments'>
                        Lista de Consultas
                    </Link>

                </article>

                <article className={styles['card-info']}>
                    <div>
                        <img src="/profile/people.svg" alt="" />
                        <h2>Pacientes Ativos</h2>
                    </div>

                    <span>{patientsCount}</span>

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

                    {upcomingAppointments.map((appointment) => (
                        <div
                            className={styles['table-row']}
                            key={appointment.id}
                        >
                            <span>
                                {dayjs(appointment.starts_at)
                                    .tz('America/Sao_Paulo')
                                    .format('DD/MM HH:mm')}
                            </span>

                            <span>
                                {appointment.patient.name}
                            </span>

                            <span>
                                {appointment.status === 'SCHEDULED' && 'AGENDADO'}
                            </span>
                        </div>
                    ))}

                </div>
            </section>
        </>
    )
}