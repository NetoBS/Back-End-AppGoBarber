import {  Router } from 'express';
import multer from 'multer';
import uploadconfig from '@config/upload'
import { container } from 'tsyringe';

import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadconfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    usersAvatarController.update,
);

export default usersRouter;