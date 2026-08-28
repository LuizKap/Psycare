import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './modules/auth/auth.routes.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';
import { authMiddlewareInstance } from './modules/auth/auth.dependencies.js';

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(authMiddlewareInstance)
app.use('/auth', authRouter)
app.use(errorHandlerMiddleware)

export default app
