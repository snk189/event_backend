import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error',
      errors: err.issues,
    });
  }

  // Handle unique constraint violations from Prisma
  if ((err as any).code === 'P2002') {
    return res.status(409).json({
      status: 'fail',
      message: 'Duplicate field value entered',
    });
  }

  console.error('ERROR 💥:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
