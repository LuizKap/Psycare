import type { Request, Response } from "express";
import type { AppointmentService } from "./appointment.service.js";
import { checkAvailabilitySchema } from "./appointment.schema.js";

export class AppointmentController {
    constructor(private appointmentService: AppointmentService) { }

    getAvailability = async (req: Request, res: Response) => {
        const { date } = checkAvailabilitySchema.parse(req.query)

        const availableHours = await this.appointmentService.getAvailability(date)

        res.json(availableHours)
    }
}