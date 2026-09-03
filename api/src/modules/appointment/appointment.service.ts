import type { Appointment, Patient } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";
import type { IPatientRepository } from "../patient/patient.interface.js";
import type { AppointmentFilters, AppointmentPagination, AppointmentSorting, PaginationProperties, UpdateAppointmentData } from "./appointment.auxiliar.func/buildAppointmentFilters.js";
import { isValidAppointmentDate } from "./appointment.auxiliar.func/isValidAppointmentDate.js";
import type { IAppointmentRepository } from "./appointment.interface.js";
import dayjs from './appointment.util.dayjs.js'

// Aqui eu construo tudo passando o timezone do brasil para evitar alguns bugs de fuso horário

export class AppointmentService {
    constructor(
        private appointmentRepository: IAppointmentRepository,
        private patientRepository: IPatientRepository
    ) { }

    async getAvailability(date: string): Promise<string[]> {

        const operatingHours: number[] = []
        const appointmentHours: number[] = []


        for (let hour = 9; hour <= 21; hour++) {
            operatingHours.push(hour)
            // para construir os horarios que o psicologo trabalha
        }

        const day = dayjs.tz(date, 'YYYY-MM-DD', 'America/Sao_Paulo')

        const isWeekend = [0, 6].includes(day.day())
        if (isWeekend) {
            throw new HttpError(400, 'A data não deve ser um final de semana')
        }

        const startOfDay = day.startOf('day').toDate()
        const startOfNextDay = day.add(1, 'day').startOf('day').toDate()

        const appointments = await this.appointmentRepository.findAllAppointmentsByDate(startOfDay, startOfNextDay)
        // peguei a data e horario das consultas em um range entre o inicio do dia e o inicio do proximo dia (00:00 até 00:00)


        appointments.forEach(appointment => {
            appointmentHours.push(dayjs(appointment.starts_at).tz('America/Sao_Paulo').hour())
            //para pegar apenas os horarios das consultas
        });


        const availableHours = operatingHours
            .filter(hour => !appointmentHours.includes(hour))
            .map(hour => `${hour}`.padStart(2, '0') + ':00')
        // PARA pegar apenas os horarios em que 
        // NAO tem consulta marcada
        // E transformar os numeros sozinhos. EX: (8 = 08, 9 = 09)

        return availableHours
    }


    async createAppointment(appointmentData: Pick<Appointment, 'starts_at' | 'patient_id'>): Promise<Appointment> {
        const { starts_at, patient_id } = appointmentData

        if (!isValidAppointmentDate(starts_at)) throw new HttpError(400, 'Horário Inválido para consulta')

        const isWeekend = [0, 6].includes(dayjs(starts_at).tz('America/Sao_Paulo').day())
        if (isWeekend) {
            throw new HttpError(400, 'A data não deve ser um final de semana')
        }

        const isSomeAppointmentScheduled = await this.appointmentRepository.findScheduledAppointmentByPatientId(patient_id)
        if (isSomeAppointmentScheduled) throw new HttpError(400, 'Voce ja tem uma consulta agendada')

        const isSomeAppointmentAtThisDateTime = await this.appointmentRepository.findAppointmentByDate(starts_at)
        if (isSomeAppointmentAtThisDateTime) throw new HttpError(400, 'Voce ja tem uma consulta marcada nesse horário')


        const ends_at = dayjs(starts_at).add(1, 'hour').toDate()

        const appointment = await this.appointmentRepository.createAppointment({ starts_at, ends_at, patient_id })

        return appointment
    }

    async getPatientAppointments(patient_id: Patient['id']): Promise<Appointment[]> {

        const appointments = await this.appointmentRepository.findAllAppointmentsByPatientId(patient_id)

        return appointments
    }

    async getFilteredAppointments(
        filters: AppointmentFilters,
        sorting: AppointmentSorting,
        pagination: AppointmentPagination): Promise<{ appointments: Appointment[], pagination: PaginationProperties }> {

        const appointments = await this.appointmentRepository.findAppointments(filters, sorting, pagination)

        return appointments
    }

    async updateAppointment(id: Appointment['id'], updateData: UpdateAppointmentData): Promise<Appointment> {
        const { notes, starts_at } = updateData

        const appointment = await this.appointmentRepository.findAppointmentById(id)
        if (!appointment) throw new HttpError(404, 'consulta não encontrada')


        if ((appointment.status === 'CANCELLED' ||
            appointment.status === 'COMPLETED') &&
            starts_at !== undefined) {

            throw new HttpError(400, 'Você não pode atualizar o horário de uma consulta cancelada ou concluída')

        }

        // Se starts_at não foi alterado, mantém o ends_at atual
        let ends_at = appointment.ends_at

        if (starts_at !== undefined) {

            if (starts_at < new Date()) throw new HttpError(409,
                'Você não pode atualizar o horário antecedendo o horário/dia de hoje')


            const isSomeAppointmentAtThisDateTime = await this.appointmentRepository.findAppointmentByDate(starts_at)
            if (isSomeAppointmentAtThisDateTime) throw new HttpError(409,
                'Já existe uma consulta nesse horário')

            if (!isValidAppointmentDate(starts_at)) throw new HttpError(400,
                'Essa data violaria a regra do seu horário de trabalho')

            ends_at = dayjs(starts_at).add(1, 'hour').toDate()
        }


        const updatedAppointment = await this.appointmentRepository.updateAppointment(id, { notes, starts_at }, ends_at)

        return updatedAppointment
    }

    async cancelAppointment(id: Appointment['id']): Promise<Appointment> {

        const appointment = await this.appointmentRepository.findAppointmentById(id)
        if (!appointment) throw new HttpError(404, 'Consulta não encontrada')

        if (appointment.status === 'COMPLETED' ||
            appointment.status === 'CANCELLED')
            throw new HttpError(400, 'Consulta completa ou já cancelada')

       const cancelledAppointment =  await this.appointmentRepository.cancelAppointment(id)

       return cancelledAppointment
    }

}