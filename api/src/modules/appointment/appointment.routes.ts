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

