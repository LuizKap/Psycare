import type { ErrorRequestHandler } from "express";
import { HttpError } from "../modules/errors/HttpError.js";
import { ZodError } from "zod";

export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {

    if (error instanceof HttpError) {
        res.status(error.status).json({ message: error.message })
        return
    }

    if (error instanceof ZodError) {
        res.status(400).json({ message: 'Dados Inválidos', errors: error.issues })
        return
    }

    res.status(500).json({ message: 'Erro interno no servidor' })
}