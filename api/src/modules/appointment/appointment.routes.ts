import { Router } from "express";
import { appointmentController } from "./appointment.dependencies.js";
import { requireAuthMiddleware } from '../../middlewares/requireAuth.middleware.js';
import { requirePatientMiddleware } from "../../middlewares/requirePatient.middleware.js";
import { requirePsychologistMiddleware } from "../../middlewares/requirePsychologist.middleware.js";



export const appointmentRouter = Router()
appointmentRouter.use(requireAuthMiddleware)

appointmentRouter.get('/', requirePatientMiddleware, appointmentController.getPatientAppointments)
appointmentRouter.get('/availability', requirePatientMiddleware, appointmentController.getAvailability)
appointmentRouter.post('/', requirePatientMiddleware, appointmentController.createAppointment)

appointmentRouter.get('/filter', requirePsychologistMiddleware, appointmentController.getFilteredAppointments)
appointmentRouter.patch('/:id/reschedule', requirePatientMiddleware, appointmentController.reschedule)
appointmentRouter.patch('/:id/notes', requirePsychologistMiddleware, appointmentController.updateNotes)
appointmentRouter.patch('/:id/cancel/psychologist', requirePsychologistMiddleware, appointmentController.psychologistCancel)
appointmentRouter.patch('/:id/cancel/patient', requirePatientMiddleware, appointmentController.patientCancel)
