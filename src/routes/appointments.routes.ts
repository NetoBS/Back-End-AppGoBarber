import {  Router } from 'express'
import {  parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/createAppointmentServices';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//Responsabilidades da rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
})

appointmentsRouter.post('/', (request, response) =>{
   try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const CreateAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = CreateAppointment.execute({ 
            date: parsedDate,
            provider,
        });
        

        return response.json(appointment);
   } catch (err) {
        if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
        }
    }
});

export default appointmentsRouter;