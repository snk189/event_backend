import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.routes';
import { errorHandler } from './middleware/error.middleware';
import { AppError } from './utils/AppError';

const app = express();

// 1. Concrete Strategy: Rate Limiting
// To protect our 1GB RAM server during the 2000 students / 60 seconds spike,
// we limit each IP to 50 requests per minute. This smooths out the spike 
// and prevents the server (and database pool) from being overwhelmed.
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // limit each IP to 50 requests per windowMs
  message: {
    status: 'fail',
    message: 'Too many requests from this IP, please try again after a minute'
  }
});

// Apply rate limiter to all requests
app.use(limiter);

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
