import { HttpError } from "../errors/HttpError.js";
import { loginPatientSchema, registerPatientSchema } from "./auth.schema.js";
import type { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response) => {
        const patientData = registerPatientSchema.parse(req.body)

        const { patient, token } = await this.authService.register({
            name: patientData.name,
            email: patientData.email,
            password: patientData.password
        })

        res.cookie('session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 10
        })

        res.status(201).json({
            patient:
            {
                id: patient.id,
                email: patient.email,
                name: patient.name,
                created_at: patient.created_at,
                updated_at: patient.updated_at
            }, message: 'Usuário criado'
        })
    };

    login = async (req: Request, res: Response) => {
        const patientData = loginPatientSchema.parse(req.body)

        const { patient, token } = await this.authService.login(patientData)

        res.cookie('session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 10
        })

        res.status(200).json({
            patient: {
                id: patient.id,
                email: patient.email,
                name: patient.name,
                created_at: patient.created_at,
                updated_at: patient.updated_at
            }, message: 'Usuário logado'
        })
    };

    logout = async (req: Request, res: Response) => {
        const token = req.cookies.session
        if (!token) throw new HttpError(401, 'Usuário não autenticado')

        await this.authService.logout(token)
        res.clearCookie('session')
        res.status(200).json({ message: 'Logout realizado' })
    }

}