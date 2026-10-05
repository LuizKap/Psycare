import { createContext, useEffect, useState } from "react";
import { ApiError, type Appointment, type AppointmentsContextType, type ProviderProps } from "../types";
import { appointment_api } from "../fetch/appointment.api";
import { Loading } from "../App/components/Loading/Loading";
import { toast } from "sonner";



export const AppointmentsContext = createContext<AppointmentsContextType | null>(null)


export function AppointmentsProvider({ children }: ProviderProps) {

    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    async function refreshAppointments() {

        try {
            const scheduledAppointments = await appointment_api.getPatientScheduledAppointments()

            setAppointments(scheduledAppointments)
        }
        catch (error) {

            toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar dados de consultas')
            
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        refreshAppointments()

    }, [])


    if (loading) return (
        <Loading />
    )

    return (

        <AppointmentsContext.Provider value={{ appointments, setAppointments, loading }}>
            {children}
        </AppointmentsContext.Provider>

    )
}