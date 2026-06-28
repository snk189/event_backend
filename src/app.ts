import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index.routes';
import { errorHandler } from './middleware/error.middleware';
import { AppError } from './utils/AppError';

const app = express();

app.use(express.json());

// API Routes
app.use('/', routes);

// Handle unhandled routes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;
