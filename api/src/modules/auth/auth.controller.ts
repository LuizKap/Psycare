import { HttpError } from "../errors/HttpError.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";
import type { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";

export class AuthController {
    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response) => {
        const userData = registerUserSchema.parse(req.body)

        const { patient, user, token } = await this.authService.register({
            name: userData.name,
            email: userData.email,
            password: userData.password
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
                name: patient.name
            }, message: 'Usuário criado'
        })
    };

    login = async (req: Request, res: Response) => {
        const userData = loginUserSchema.parse(req.body)

        const { patient, user, token } = await this.authService.login(userData)

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
            }, message: 'Usuário logado'
        });
    };

    logout = async (req: Request, res: Response) => {
        const token = req.cookies.session
        if (!token) throw new HttpError(401, 'Usuário não autenticado')

        await this.authService.logout(token)
        res.clearCookie('session')
        res.status(200).json({ message: 'Logout realizado' })
    }

}