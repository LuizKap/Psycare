import { Router } from "express"

import { appointmentController } from "./appointment.dependencies.js"

import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js"
import { requirePatientMiddleware } from "../../middlewares/requirePatient.middleware.js"
import { requirePsychologistMiddleware } from "../../middlewares/requirePsychologist.middleware.js"


export const appointmentRouter = Router()

appointmentRouter.use(requireAuthMiddleware)


// GET — Patient
appointmentRouter.get(
    "/",
    requirePatientMiddleware,
    appointmentController.getPatientAppointments
)

appointmentRouter.get(
    "/scheduled/patient",
    requirePatientMiddleware,
    appointmentController.getPatientScheduledAppointments
)

appointmentRouter.get(
    "/availability",
    requirePatientMiddleware,
    appointmentController.getAvailability
)


// GET — Psychologist
appointmentRouter.get(
    "/filter",
    requirePsychologistMiddleware,
    appointmentController.getFilteredAppointments
)

appointmentRouter.get(
    "/count/today",
    requirePsychologistMiddleware,
    appointmentController.countTodayAppointments
)

appointmentRouter.get(
    "/next",
    requirePsychologistMiddleware,
    appointmentController.getNextAppointment
)

appointmentRouter.get(
    "/upcoming",
    requirePsychologistMiddleware,
    appointmentController.getUpcomingAppointments
)


// POST — Patient
appointmentRouter.post(
    "/",
    requirePatientMiddleware,
    appointmentController.createAppointment
)


// PATCH — Patient
appointmentRouter.patch(
    "/:id/reschedule",
    requirePatientMiddleware,
    appointmentController.reschedule
)

appointmentRouter.patch(
    "/:id/cancel/patient",
    requirePatientMiddleware,
    appointmentController.patientCancel
)


// PATCH — Psychologist
appointmentRouter.patch(
    "/:id/notes",
    requirePsychologistMiddleware,
    appointmentController.updateNotes
)

appointmentRouter.patch(
    "/:id/cancel/psychologist",
    requirePsychologistMiddleware,
    appointmentController.psychologistCancel
)