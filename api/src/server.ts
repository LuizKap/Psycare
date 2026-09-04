import 'dotenv/config'
import app from './app.js'
import { startAppointmentJob } from './jobs/appointment.job.js'
import { startSessionJob } from './jobs/session.job.js'


const PORT = process.env.PORT || 3000

startAppointmentJob()
startSessionJob()


app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})