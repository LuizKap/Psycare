import { createContext, useEffect, useState } from "react";
import type { Appointment, AppointmentsContextType, ProviderProps } from "../types";
import { useAuth } from "../hooks/useAuth";
import { appointment_api } from "../fetch/appointment.api";



export const AppointmentsContext = createContext<AppointmentsContextType | null>(null)


export function AppointmentsProvider({ children }: ProviderProps) {

    const auth = useAuth()

    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function refreshAppointments() {

        if (auth.loading) return

        /*if (!auth.profile) return */

        try {
            setLoading(true)

            const scheduledAppointments = await appointment_api.getPatientScheduledAppointments()

            setAppointments(scheduledAppointments)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshAppointments()
    }, [auth.loading])

    return (

        <AppointmentsContext.Provider value={{ appointments, setAppointments, loading }}>
            {children}
        </AppointmentsContext.Provider>

    )
}