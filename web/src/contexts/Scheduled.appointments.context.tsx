import { createContext, useEffect, useState, useCallback } from "react";
import { ApiError, type Appointment, type ScheduledAppointmentsContextType, type ProviderProps } from "../types";
import { appointment_api } from "../fetch/appointment.api";
import { toast } from "sonner";



export const ScheduledAppointmentsContext = createContext<ScheduledAppointmentsContextType | null>(null)


export function ScheduledAppointmentsProvider({ children }: ProviderProps) {

    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const refreshScheduledAppointments = useCallback(async () => {

        setLoading(true)
        setError(false)

        try {
            const scheduledAppointments = await appointment_api.getPatientAppointments('SCHEDULED')

            setAppointments(scheduledAppointments)
        }
        catch (error) {

            toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar dados de consultas')
            setError(true)

        }
        finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {

        void refreshScheduledAppointments()

    }, [refreshScheduledAppointments])

    return (

        <ScheduledAppointmentsContext.Provider value={{ appointments, loading, error, refreshScheduledAppointments }}>
            {children}
        </ScheduledAppointmentsContext.Provider>

    )
}