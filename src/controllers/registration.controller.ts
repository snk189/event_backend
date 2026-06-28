import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { registrationService } from '../services/registration.service';

export class RegistrationController {
  async register(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      // User is authenticated, so req.user is present
      const studentId = req.user!.userId;
      const registration = await registrationService.registerForEvent(studentId);
      
      res.status(201).json({
        status: 'success',
        data: {
          registration,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const registrationController = new RegistrationController();
