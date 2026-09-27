import { Router } from "express";
import { appointmentController } from "./appointment.dependencies.js";
import { requireAuthMiddleware } from '../../middlewares/requireAuth.middleware.js';
import { requirePatientMiddleware } from "../../middlewares/requirePatient.middleware.js";
import { requirePsychologistMiddleware } from "../../middlewares/requirePsychologist.middleware.js";



export const appointmentRouter = Router()
appointmentRouter.use(requireAuthMiddleware)

appointmentRouter.get('/', requirePatientMiddleware, appointmentController.getPatientAppointments)
appointmentRouter.get('/scheduled/patient', requirePatientMiddleware,appointmentController.getPatientScheduledAppointments)
appointmentRouter.get('/availability', requirePatientMiddleware, appointmentController.getAvailability)
appointmentRouter.get('/filter', requirePsychologistMiddleware, appointmentController.getFilteredAppointments)

appointmentRouter.post('/', requirePatientMiddleware, appointmentController.createAppointment)

appointmentRouter.patch('/:id/reschedule', requirePatientMiddleware, appointmentController.reschedule)
appointmentRouter.patch('/:id/notes', requirePsychologistMiddleware, appointmentController.updateNotes)
appointmentRouter.patch('/:id/cancel/psychologist', requirePsychologistMiddleware, appointmentController.psychologistCancel)
appointmentRouter.patch('/:id/cancel/patient', requirePatientMiddleware, appointmentController.patientCancel)
