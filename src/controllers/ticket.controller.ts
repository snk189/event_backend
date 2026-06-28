import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { registrationService } from '../services/registration.service';

export class TicketController {
  async getTicket(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user!.userId;
      const ticket = await registrationService.getTicket(studentId);
      
      res.status(200).json({
        status: 'success',
        data: {
          ticket,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const ticketController = new TicketController();
