import type { Request, Response } from "express";
import type { AppointmentService } from "./appointment.service.js";
import { checkAvailabilitySchema, createAppointmentSchema } from "./appointment.schema.js";
import type { PatientUser } from "../../middlewares/auth.middleware.js";

export class AppointmentController {
    constructor(private appointmentService: AppointmentService) { }

    getAvailability = async (req: Request, res: Response) => {
        const { date } = checkAvailabilitySchema.parse(req.query)

        const availableHours = await this.appointmentService.getAvailability(date)

        res.json(availableHours)
    }

    createAppointment = async (req: Request, res: Response) => {

        const { starts_at } = createAppointmentSchema.parse(req.body)
        const { patient_id } = req.user as PatientUser

        const appointment = await this.appointmentService.createAppointment({ starts_at, patient_id })

        res.status(201).json(appointment)
    }

    getPatientAppointments = async (req: Request, res: Response) => {

        const { patient_id } = req.user as PatientUser

        const appointments = await this.appointmentService.getPatientAppointments(patient_id)

        res.json(appointments)
    }
}