import { Router } from "express";
import { appointmentController } from "./appointment.dependencies.js";
import { requireAuthMiddleware } from '../../middlewares/requireAuth.middleware.js';
import { requirePatientMiddleware } from "../../middlewares/requirePatient.middleware.js";


export const appointmentRouter = Router()
appointmentRouter.use(requireAuthMiddleware, requirePatientMiddleware)

appointmentRouter.get('/', appointmentController.getPatientAppointments)
appointmentRouter.get('/availability', appointmentController.getAvailability)
appointmentRouter.post('/', appointmentController.createAppointment)
