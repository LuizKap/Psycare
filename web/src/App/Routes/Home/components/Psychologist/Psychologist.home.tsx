
import { Link } from 'react-router'
import { useAuth } from '../../../../../hooks/useAuth'
import styles from './Psychologist.home.module.css'


export function PsychologistHome() {

    const auth = useAuth()

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
                    <span>numero</span>
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

                    <span>14:00</span>
                    <p>João Silva</p>
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