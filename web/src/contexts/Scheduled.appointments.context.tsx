import { createContext, useEffect, useState } from "react";
import { ApiError, type Appointment, type ScheduledAppointmentsContextType, type ProviderProps } from "../types";
import { appointment_api } from "../fetch/appointment.api";
import { Loading } from "../App/components/Loading/Loading";
import { toast } from "sonner";



export const ScheduledAppointmentsContext = createContext<ScheduledAppointmentsContextType | null>(null)


export function ScheduledAppointmentsProvider({ children }: ProviderProps) {

    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    async function refreshAppointments() {

        try {
            const scheduledAppointments = await appointment_api.getPatientAppointments('SCHEDULED')
            console.log(scheduledAppointments)

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

        <ScheduledAppointmentsContext.Provider value={{ appointments, loading }}>
            {children}
        </ScheduledAppointmentsContext.Provider>

    )
}