import { startOfHour } from "date-fns";

import Appointment from "../models/Appointment";
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

/**
 * Dependency Inversion (SOLID)
 */

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }



    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

    const findAppointmenteInSameData = this.appointmentsRepository.findByDate(
        appointmentDate,
    );

    if (findAppointmenteInSameData) {
        throw Error( 'this appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
        provider, 
        date: appointmentDate,
    })

    return appointment;
    }
}

export default CreateAppointmentService;