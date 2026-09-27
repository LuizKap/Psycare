import { createContext, useEffect, useState } from "react";
import type { Appointment, AppointmentsContextType, ProviderProps } from "../types";
import { useAuth } from "../hooks/useAuth";



export const AppointmentsContext = createContext<AppointmentsContextType | null>(null)


export function AppointmentsProvider({ children }: ProviderProps) {

    const auth = useAuth()

    const [appointments, setAppointments] = useState<Appointment[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        async function getScheduledAppointments() {

            if (auth.loading) return

            if (!auth.profile) return

            try {
                setLoading(true)

                const response = await fetch('/appointments/scheduled/patient')

                if (!response.ok) return

                const scheduledAppointments: Appointment[] = await response.json()

                setAppointments(scheduledAppointments)
            } finally {
                setLoading(false)
            }
        }

        getScheduledAppointments()

    }, [auth.loading])

    return (

        <AppointmentsContext.Provider value={{ appointments, setAppointments, loading }}>
            {children}
        </AppointmentsContext.Provider>

    )
}