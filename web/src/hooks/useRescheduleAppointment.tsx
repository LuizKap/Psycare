import type { Dayjs } from "dayjs";
import { useState } from "react";
import { ApiError, type Appointment } from "../types";
import { appointment_api } from "../fetch/appointment.api";
import { toast } from "sonner";
import { useScheduledAppointments } from "./useScheduledAppointments";



export function useRescheduleAppointment() {

    const [loadingReschedule, setLoadingReschedule] = useState<boolean>(false)
    const { refreshScheduledAppointments } = useScheduledAppointments()

    async function handleRescheduleAppointment(selectedDay: Dayjs, selectedTime: string, id: Appointment['id']) {

        try {
            setLoadingReschedule(true)

            const [hour, minute] = selectedTime.split(':').map(Number)

            const date = selectedDay
                .hour(hour)
                .minute(minute)
                .second(0)
                .millisecond(0)
                .toDate();

            const dateUTC = date.toISOString()

            const { message } = await appointment_api.rescheduleAppointment(dateUTC, id)
            toast.success(message)
            await refreshScheduledAppointments()

        } catch (error) {

            toast.error(error instanceof ApiError ?
                error.message :
                'Não foi possível atualizar a consulta.')

        }
        finally {
            setLoadingReschedule(false)
        }
    }

    return {
        loadingReschedule,
        handleRescheduleAppointment
    }
}