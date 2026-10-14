import { useCallback, useEffect, useState } from "react";
import { ApiError, type Appointment } from "../types";
import { appointment_api } from "../fetch/appointment.api";
import { toast } from "sonner";



export function usePreviousAppointments() {

    const [previousAppointments, setPreviousAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)


    const refreshPreviousAppointments = useCallback(async () => {

        setLoading(true)
        setError(false)

        try {

            const appointments = await appointment_api.getPatientPreviousAppointments();
            setPreviousAppointments(appointments);

        } catch (error) {

            setError(true);

            toast.error(
                error instanceof ApiError ? error.message : "Erro ao carregar consultas anteriores"
            );

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void refreshPreviousAppointments()
    }, [refreshPreviousAppointments])

    return {
        previousAppointments,
        refreshPreviousAppointments,
        loading,
        error
    }
}