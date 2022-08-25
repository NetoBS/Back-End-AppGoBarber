import 'reflect-metadata'; 

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './shared/routes'
import uploadConfig from './config/upload';
import AppError from './shared/errors/AppError';

import './shared/database';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello GoStack '});
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            stattus: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: ' Internal server error',
    })
});

app.listen(3333, () => {
    console.log('😎 Server started on port 3333!');
});