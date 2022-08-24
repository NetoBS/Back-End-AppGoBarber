import {  Router } from 'express';
import multer from 'multer';
import uploadconfig from '../config/upload'

import CreateUserService from '../modules/users/services/createUsersService';
import UpdateUserAvatarService from '../modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadconfig);

usersRouter.post('/', async (request, response) =>{
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password

        return response.json(user);
  },
);

export default usersRouter;