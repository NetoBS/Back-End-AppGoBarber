import Appointment from "../../../models/Appointment";

export default interface IAppointmentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>
}