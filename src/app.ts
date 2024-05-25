import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import test from './app/middlewares/test';
import router from './app/routes';

const app = express();

// parsers
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/', router);

// test route
app.get('/', test);

// globalError handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
