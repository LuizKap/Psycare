import { appointmentService } from './../modules/appointment/appointment.dependencies.js'

async function runAppointmentJob() {
    try {
        const completed = await appointmentService.completeFinishedAppointments()

        console.log(`${completed} consultas foram completadas`)
    } catch (error) {
        console.error('Erro no Appointment Job:', error)
    }
}

export function startAppointmentJob() {
    runAppointmentJob()
    setInterval(runAppointmentJob, 60_000)
}