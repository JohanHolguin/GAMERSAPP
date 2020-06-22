import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import gameController from './routers/game.router';
import userController from './routers/user.router';
import { env } from './config/config';
require('./database/connection');
import path from 'path';
import cors from 'cors';

// Inicializar el Servidor
const app = express();

// Config
app.set('port', env.port || 4000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(userController);
app.use(gameController);

// Static Files
app.use('/uploads', express.static(path.resolve('uploads')));

// Inicializar el Servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port`, env.port || 4000);
});