import type { Request, Response } from "express";
import type { PatientService } from "./patient.service.js";
import type { PatientUser } from "../../middlewares/auth.middleware.js";


export class PatientController {
    constructor(private patientService: PatientService) { }

    getPatientProfile = async (req: Request, res: Response) => {
        const user = req.user as PatientUser

        const patient = await this.patientService.getPatientProfile(user.patient_id)

        res.json(patient)
    }

}