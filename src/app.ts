import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// parsers
app.use(cors());
app.use(express.json());

// routes
// app.use('/api/v1/users');

// test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'App is running successfully!',
  });
});

// not found route
app.all('/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'No route found!',
  });
});

export default app;
