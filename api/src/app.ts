import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './modules/auth/auth.routes.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';
import { authMiddlewareInstance } from './modules/auth/auth.dependencies.js';
import { appointmentRouter } from './modules/appointment/appointment.routes.js';
import { patientRouter } from './modules/patient/patient.routes.js';
import { psychologistRouter } from './modules/psychologist/psychologist.routes.js';


const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(authMiddlewareInstance)
app.use('/api/auth', authRouter)
app.use('/api/patient', patientRouter)
app.use('/api/appointments', appointmentRouter)
app.use('/api/psychologist', psychologistRouter)
app.use(errorHandlerMiddleware)

export default app
