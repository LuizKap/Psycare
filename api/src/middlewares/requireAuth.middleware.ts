import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../modules/errors/HttpError.js";


export const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
        return next(new HttpError(401, 'Usuário não autenticado'))
    }

    next()
}