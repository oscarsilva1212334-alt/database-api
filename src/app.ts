import path from 'path';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import apiV1 from './api/v1';
import { errorHandler, notFoundHandler } from './shared/middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Frontend estático (carpeta /public en la raíz del proyecto)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/v1', apiV1);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
