import { AppointmentController } from "./appointment.controller.js";
import { AppointmentService } from "./appointment.service.js";
import { AppointmentRepository } from "./appointment.repository.js";
import { prisma } from "../../lib/prisma.js";


export const appointmentRepository = new AppointmentRepository(prisma)
export const appointmentService = new AppointmentService(appointmentRepository)
export const appointmentController = new AppointmentController(appointmentService)