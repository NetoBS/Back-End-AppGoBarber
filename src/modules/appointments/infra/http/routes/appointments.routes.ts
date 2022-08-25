import {  Router } from 'express'
import { getCustomRepository } from 'typeorm';
import {  parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/createAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) =>{
   try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const CreateAppointment = new CreateAppointmentService();

        const appointment = await CreateAppointment.execute({ 
            date: parsedDate,
            provider_id,
        });
        

        return response.json(appointment);
   } catch (err) {
        if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
        }
    }
});

export default appointmentsRouter;