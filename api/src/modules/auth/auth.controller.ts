import { registerPatientSchema } from "./auth.schema.js";
import type { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) { }

    async registerPatient(req: Request, res: Response) {
        const patientData = registerPatientSchema.parse(req.body)

        const { patient, token } = await this.authService.registerPatient({
            name: patientData.name,
            email: patientData.email,
            password: patientData.password
        })

        res.cookie('session', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 10
        })
        
        res.status(201).json({
            patient:
            {
                id: patient.id,
                email: patient.email,
                name: patient.name
            }
        })
    }
}