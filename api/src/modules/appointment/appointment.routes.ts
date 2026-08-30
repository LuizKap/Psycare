import { Router } from "express";
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js";
import { appointmentController } from "./appointment.dependencies.js";


export const appointmentRouter = Router()


appointmentRouter.get('/availability', appointmentController.getAvailability)