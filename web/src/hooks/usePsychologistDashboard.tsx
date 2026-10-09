
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { appointment_api } from '../fetch/appointment.api'
import { patient_api } from '../fetch/patient.api'
import { ApiError, type NextAppointment } from '../types'

export function usePsychologistDashboard() {
    const [todayAppointmentsCount, setTodayAppointmentsCount] = useState<number>(0)

    const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null)

    const [upcomingAppointments, setUpcomingAppointments] = useState<NextAppointment[]>([])

    const [patientsCount, setPatientsCount] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function loadDashboard() {
            try {
                const [todayCount, next, upcoming, patients] = await Promise.all([
                    appointment_api.countTodayAppointments(),
                    appointment_api.getNextAppointment(),
                    appointment_api.getUpcomingAppointments(),
                    patient_api.countPatients()
                ])

                setTodayAppointmentsCount(todayCount)
                setNextAppointment(next)
                setUpcomingAppointments(upcoming)
                setPatientsCount(patients)

            } catch (error) {
                toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar algumas informações')
            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [])

    return {
        todayAppointmentsCount,
        nextAppointment,
        upcomingAppointments,
        patientsCount,
        loading
    }
}

