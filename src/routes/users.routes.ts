import {  Router } from 'express';
import multer from 'multer';
import uploadconfig from '../config/upload'

import CreateUserService from '../services/createUsersService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadconfig);

usersRouter.post('/', async (request, response) =>{
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
        }
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    console.log(request.file);
    return response.json({ ok: true });
},
);

export default usersRouter;