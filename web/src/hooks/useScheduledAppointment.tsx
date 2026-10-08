import { useContext } from "react"
import { ScheduledAppointmentsContext } from "../contexts/Scheduled.appointments.context"


export function useScheduledAppointment() {
    const context = useContext(ScheduledAppointmentsContext)

    if (!context) {
        throw new Error('useScheduledAppointment deve ser usado dentro de AppointmentProvider')
    }
    else {
        return context
    }
}