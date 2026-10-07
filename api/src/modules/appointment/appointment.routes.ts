import { Router } from "express"

import { appointmentController } from "./appointment.dependencies.js"

import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js"
import { requirePatient } from "../patient/patient.dependencies.js"
import { requirePsychologist } from "../psychologist/psychologist.dependencies.js"


export const appointmentRouter = Router()

appointmentRouter.use(requireAuthMiddleware)


// GET — Patient
appointmentRouter.get(
    "/",
    requirePatient,
    appointmentController.getPatientAppointments
)

appointmentRouter.get(
    "/scheduled/patient",
    requirePatient,
    appointmentController.getPatientScheduledAppointments
)

appointmentRouter.get(
    "/availability",
    requirePatient,
    appointmentController.getAvailability
)

appointmentRouter.get(
    "/previous/patient",
    requirePatient,
    appointmentController.getPatientPreviousAppointments
)


// GET — Psychologist
appointmentRouter.get(
    "/filter",
    requirePsychologist,
    appointmentController.getFilteredAppointments
)

appointmentRouter.get(
    "/count/today",
    requirePsychologist,
    appointmentController.countTodayAppointments
)

appointmentRouter.get(
    "/next",
    requirePsychologist,
    appointmentController.getNextAppointment
)

appointmentRouter.get(
    "/upcoming",
    requirePsychologist,
    appointmentController.getUpcomingAppointments
)


// POST — Patient
appointmentRouter.post(
    "/",
    requirePatient,
    appointmentController.createAppointment
)


// PATCH — Patient
appointmentRouter.patch(
    "/:id/reschedule",
    requirePatient,
    appointmentController.reschedule
)

appointmentRouter.patch(
    "/:id/cancel/patient",
    requirePatient,
    appointmentController.patientCancel
)


// PATCH — Psychologist
appointmentRouter.patch(
    "/:id/notes",
    requirePsychologist,
    appointmentController.updateNotes
)

appointmentRouter.patch(
    "/:id/cancel/psychologist",
    requirePsychologist,
    appointmentController.psychologistCancel
)