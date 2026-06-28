import { registrationRepository } from '../repositories/registration.repository';
import { ticketRepository } from '../repositories/ticket.repository';
import { AppError } from '../utils/AppError';
import { generateQRCode } from '../utils/qr.util';

export class RegistrationService {
  async registerForEvent(studentId: string) {
    const existingRegistration = await registrationRepository.findByStudentId(studentId);
    if (existingRegistration) {
      throw new AppError('Student already registered', 409);
    }

    // Generate a unique registration number
    const registrationNumber = `REG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const registration = await registrationRepository.create({
      studentId,
      registrationNumber,
    });

    return registration;
  }

  async confirmPayment(registrationId: string) {
    const registration = await registrationRepository.findById(registrationId);
    if (!registration) {
      throw new AppError('Registration not found', 404);
    }

    // Duplicate payment confirmations should not break anything
    if (registration.paymentStatus) {
      return registration;
    }

    const updatedRegistration = await registrationRepository.updatePaymentStatus(registrationId, true);

    // Generate QR code and ticket
    const qrCode = await generateQRCode(registrationId);
    await ticketRepository.create({
      registrationId,
      qrCode,
    });

    return updatedRegistration;
  }

  async getTicket(studentId: string) {
    const registration = await registrationRepository.findByStudentId(studentId);
    if (!registration) {
      throw new AppError('Registration not found', 404);
    }

    if (!registration.paymentStatus) {
      throw new AppError('Ticket requested before payment is completed', 400);
    }

    const ticket = await ticketRepository.findByRegistrationId(registration.id);
    if (!ticket) {
      throw new AppError('Ticket not found', 404);
    }

    return ticket;
  }
}

export const registrationService = new RegistrationService();
