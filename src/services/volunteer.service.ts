import { registrationRepository } from '../repositories/registration.repository';
import { AppError } from '../utils/AppError';

export class VolunteerService {
  async getAllRegistrations() {
    return registrationRepository.findAll();
  }

  async checkInStudent(qrData: string) {
    // qrData is the registrationId
    const registration = await registrationRepository.findById(qrData);

    if (!registration) {
      throw new AppError('Registration not found for this QR code', 404);
    }

    if (!registration.paymentStatus) {
      throw new AppError('Payment not completed for this registration', 400);
    }

    if (registration.checkedIn) {
      throw new AppError('Student already checked in', 409);
    }

    return registrationRepository.updateCheckInStatus(registration.id, true);
  }
}

export const volunteerService = new VolunteerService();
