import { startOfHour } from "date-fns";

import AppError from '@shared/errors/AppError';

import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameData = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameData) {
            throw new AppError( 'this appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id, 
            date: appointmentDate,
        });

        return appointment;
        }
    }

export default CreateAppointmentService;