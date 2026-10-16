import type { Dayjs } from "dayjs";
import { appointment_api } from "../fetch/appointment.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ApiValidationError } from "../types";


export function useCreateAppointment(selectedDay: Dayjs | null, selectedTime: string | null) {

    const [loadingCreateAppointment, setLoadingCreateAppointment] = useState<boolean>(false)

    const navigate = useNavigate()


    async function handleCreateAppointment() {

        if (!selectedDay) return
        if (!selectedTime) return

        setLoadingCreateAppointment(true)

        try {

            const [hour, minute] = selectedTime.split(':').map(Number)

            const date = selectedDay
                .hour(hour)
                .minute(minute)
                .second(0)
                .millisecond(0)
                .toDate();

            const dateUTC = date.toISOString()

            const message = await appointment_api.createAppointment(dateUTC)
            toast.success(message)
            navigate('/patient/appointments')

        } catch (error) {

            toast.error(error instanceof ApiValidationError ?
                error.message :
                'Não foi possível criar a consulta. Erro externo')
        }
        finally {
            setLoadingCreateAppointment(false)
        }
    }

    return {
        handleCreateAppointment,
        loadingCreateAppointment
    }
}
