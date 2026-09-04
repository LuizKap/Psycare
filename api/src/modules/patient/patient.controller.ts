import type { Request, Response } from "express";
import type { PatientService } from "./patient.service.js";
import type { PatientUser } from "../../middlewares/auth.middleware.js";
import { updatePatientSchema } from "./patient.schema.js";


export class PatientController {
    constructor(private patientService: PatientService) { }

    getPatientProfile = async (req: Request, res: Response) => {
        const user = req.user as PatientUser

        const patient = await this.patientService.getPatientProfile(user.patient_id)

        res.json(patient)
    }

    updatePatient = async (req: Request, res: Response) => {
        const { id } = req.user as PatientUser
        const updatedData = updatePatientSchema.parse(req.body)

        const updatedPatient =
            await this.patientService.updatePatient(id, updatedData)

        res.json(updatedPatient)
    }

}