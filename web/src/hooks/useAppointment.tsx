import { useContext } from "react"
import { AppointmentsContext } from "../contexts/Appointments.context"


export function useAppointment() {
    const context = useContext(AppointmentsContext)

    if (!context) {
        throw new Error('useAppointment deve ser usado dentro de AppointmentProvider')
    }
    else {
        return context
    }
}