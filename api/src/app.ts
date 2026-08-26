import express from 'express'
import { authRouter } from './modules/auth/auth.routes.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(express.json())


app.use('/auth', authRouter)
app.use(errorHandlerMiddleware)

export default app
