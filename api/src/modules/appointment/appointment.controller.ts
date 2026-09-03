import type { Request, Response } from "express";
import type { AppointmentService } from "./appointment.service.js";
import { appointmentFilterSchema, appointmentPaginationSchema, appointmentSortingSchema, checkAvailabilitySchema, createAppointmentSchema, updateAppointmentSchema } from "./appointment.schema.js";
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

    getFilteredAppointments = async (req: Request, res: Response) => {

        const { created_at, notes, starts_at, status , patient_name } = appointmentFilterSchema.parse(req.query)
        const { sortBy = 'created_at', sortOrder = 'asc' } = appointmentSortingSchema.parse(req.query)
        const { limit = 20, page = 1 } = appointmentPaginationSchema.parse(req.query)

        const appointments = await this.appointmentService.getFilteredAppointments(
                { created_at, notes, starts_at, status, patient_name },
                { sortBy, sortOrder },
                { limit, page }
            )

        res.json(appointments)
    }

    updateAppointments = async (req:Request, res: Response) => {

        const {} = updateAppointmentSchema.parse(req.body)
    }
}