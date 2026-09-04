import { HttpError } from "../errors/HttpError.js";
import { loginPatientSchema, loginPsychologistSchema, registerPatientSchema, registerPsychologistSchema } from "./auth.schema.js";
import type { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) { }

    registerPatient = async (req: Request, res: Response) => {
        const userData = registerPatientSchema.parse(req.body)

        const { user, patient, token } = await this.authService.registerPatient({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone ?? null
        })

        res.cookie('session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 10
        })

        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            patient: {
                id: patient.id,
                name: patient.name,
                phone: patient.phone
            },
            message: 'Usuário criado'
        })
    };

    loginPatient = async (req: Request, res: Response) => {
        const userData = loginPatientSchema.parse(req.body)

        const { user, patient, token } = await this.authService.loginPatient(userData)

        res.cookie('session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 10
        })

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            patient: {
                id: patient.id,
                name: patient.name
            },
            message: 'Login realizado com sucesso'
        });
    };

    logout = async (req: Request, res: Response) => {
        const token = req.cookies.session
        if (!token) throw new HttpError(401, 'Usuário não autenticado')

        await this.authService.logout(token)
        res.clearCookie('session')
        res.status(200).json({ message: 'Logout realizado' })
    }


    registerPsychologist = async (req: Request, res: Response) => {
        const { name, email, entryCode, password, phone } = registerPsychologistSchema.parse(req.body)

        const { psychologist, token, user } = await this.authService.registerPsychologist({ name, email, entryCode, password, phone })

        res.cookie('session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 10
        })

        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            psychologist: {
                id: psychologist.id,
                name: psychologist.name,
                phone: psychologist.phone
            },
            message: 'Usuário criado'
        })
    }

    loginPsychologist = async (req: Request, res: Response) => {
        const { email, entryCode, password } = loginPsychologistSchema.parse(req.body)

        const { psychologist, token, user } = await this.authService.loginPsychologist({ email, password, entryCode })

        res.cookie('session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 10
        })

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            psychologist: {
                id: psychologist.id,
                name: psychologist.name,
                phone: psychologist.phone
            },
            message: 'Login realizado com sucesso'
        })

    }

}