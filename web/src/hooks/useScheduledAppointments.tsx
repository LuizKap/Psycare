import { useContext } from "react"
import { ScheduledAppointmentsContext } from "../contexts/Scheduled.appointments.context"


export function useScheduledAppointments() {
    const context = useContext(ScheduledAppointmentsContext)

    if (!context) {
        throw new Error('useScheduledAppointments deve ser usado dentro de AppointmentProvider')
    }
    else {
        return context
    }
}