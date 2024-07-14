import dotenv from 'dotenv';

if (process.env.NODE_ENV == 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import morganLogger from './middleware/morgan.middleware';
import path from 'path';
import Container from 'typedi';
import AppServiceProvider from './providers/app-service.provider';
import helmet from 'helmet';

const providers = [AppServiceProvider];
providers.forEach((provider) => new provider().register());

// Create an express app.
const app = express();
app.use(helmet());
// Global Middlewares
app.use(
  // Add custom helpers to request object
  (req, res, next) => {
    req.wantsJson = () => {
      return req.accepts()[0].includes('/json') || req.accepts()[0].includes('+json');
    };
    next();
  }
);

// Parse the application/json request body.
app.use(express.json());
// Parse the x-www-form-urlencoded request body.
app.use(express.urlencoded({ extended: true }));
// Parse the form-data request body.
app.use(multer().any());
// Enable CORS
app.use(cors());
// Log the incoming requests.
app.use(morganLogger);

// Example route.
app.get('/', (req, res) => {
  return res.json({ message: 'Home, Sweet Home.' });
});

useContainer(Container);

useExpressServer(app, {
  routePrefix: '/api/v1',
  controllers: [path.join(__dirname + '/controllers/api/v1/**/*.controller.*')],
  defaultErrorHandler: false,
  middlewares: [path.join(__dirname, '/middleware/global/*.middleware.*')],
});

// Catch 404.
app.use(function (req: Request, res: Response) {
  if (!res.headersSent) {
    return res.status(404).json({ message: 'Page Not Found!' });
  }
});

export default app;
