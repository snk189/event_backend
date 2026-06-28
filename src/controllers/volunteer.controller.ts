import { Request, Response, NextFunction } from 'express';
import { volunteerService } from '../services/volunteer.service';

export class VolunteerController {
  async getRegistrations(req: Request, res: Response, next: NextFunction) {
    try {
      const registrations = await volunteerService.getAllRegistrations();
      res.status(200).json({
        status: 'success',
        results: registrations.length,
        data: {
          registrations,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { qrData } = req.body;
      const registration = await volunteerService.checkInStudent(qrData);
      
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

export const volunteerController = new VolunteerController();
