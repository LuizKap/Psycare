import { toast } from "sonner"
import { appointment_api } from "../fetch/appointment.api"
import { ApiValidationError } from "../types"
import { useState } from "react"




export function useUpdateNotes() {

    const [loading, setLoading] = useState<boolean>(false)

    const handleUpdateNotes = async (appointmentId: string, notes: string) => {

        setLoading(true)

        try {
            const { updatedAppointment, message } = await appointment_api.updateNotes(appointmentId, notes)

            toast.success(message)

            return updatedAppointment

        } catch (error) {
            error instanceof ApiValidationError ? error.errors.forEach(error => {
                toast.error(error.message)
            }) : toast.error('Não foi possivel atualizar as notas')
        }
        finally {
            setLoading(false)
        }
    }

    return {
        handleUpdateNotes,
        loading
    }
}