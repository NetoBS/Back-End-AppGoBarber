import {  Router } from 'express';
import multer from 'multer';
import uploadconfig from '@config/upload';

import UsersController from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadconfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    userAvatarController.update,
);

export default usersRouter;