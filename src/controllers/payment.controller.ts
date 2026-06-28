import { Request, Response, NextFunction } from 'express';
import { registrationService } from '../services/registration.service';

export class PaymentController {
  async confirmPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { registrationId } = req.body;
      const registration = await registrationService.confirmPayment(registrationId);
      
      res.status(200).json({
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

export const paymentController = new PaymentController();
