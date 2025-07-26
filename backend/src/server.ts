import express from 'express';
import cors from 'cors';
import { serverConfig, validateConfig } from './config';
import authRoutes from './routes/auth';
import carRoutes from './routes/cars';
import reservationRoutes from './routes/reservations';
import userRoutes from './routes/users';

validateConfig();

const app = express();
const { port: PORT, nodeEnv, frontendUrl } = serverConfig;

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Car Rental API is running' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  }
);

app.listen(PORT, () => {
  console.log(`🚗 Car Rental API server running on port ${PORT}`);
  console.log(`📊 Environment: ${nodeEnv}`);
});
