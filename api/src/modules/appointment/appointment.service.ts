

import type { Appointment } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";
import type { AppointmentRepository } from "./appointment.repository.js";
import dayjs from './appointment.util.dayjs.js'

// Aqui eu construo tudo passando o timezone do brasil para evitar alguns bugs de fuso horário

export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) { }

    async getAvailability(date: string): Promise<number[]> {

        let operatingHours: number[] = []
        let appointmentHours: number[] = []


        for (let hour = 9; hour <= 22; hour++) {
            operatingHours.push(hour)
            // para construir os horarios que o psicologo trabalha
        }

        const isWeekend = [0, 6].includes(dayjs(date).day())
        if (isWeekend) {
           throw new HttpError(400, 'A data não deve ser um final de semana')
        }

        const day = dayjs.tz(date, 'YYYY-MM-DD', 'America/Sao_Paulo')
        const startOfDay = day.startOf('day').toDate()
        const startOfNextDay = day.add(1, 'day').startOf('day').toDate()

        const appointments = await this.appointmentRepository.findAllAppointmentsByDate(startOfDay, startOfNextDay)
        // peguei a data e horario das consultas em um range entre o inicio do dia e o inicio do proximo dia (00:00 até 00:00)


        appointments.forEach(appointment => {
            appointmentHours.push(dayjs(appointment.starts_at).tz('America/Sao_Paulo').hour())
            //para pegar apenas os horarios das consultas
        });


        const availableHours = operatingHours.filter(hour => !appointmentHours.includes(hour))
        // para pegar apenas os horarios em que 
        // NAO tem consulta marcada

        return availableHours
    }

    async createAppointment(appointment: Pick<Appointment, 'starts_at' | 'patient_id'>): Promise<Appointment>{
        
    }
}