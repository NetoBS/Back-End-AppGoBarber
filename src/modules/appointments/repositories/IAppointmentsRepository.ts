import Appointment from "../../../models/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateApointmentDTO";

export default interface IAppointmentsRepository {
    create(date: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>
}