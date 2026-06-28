import prisma from '../lib/prisma';
import { Prisma, Registration } from '@prisma/client';

export class RegistrationRepository {
  async create(data: Prisma.RegistrationUncheckedCreateInput): Promise<Registration> {
    return prisma.registration.create({ data });
  }

  async findByStudentId(studentId: string): Promise<Registration | null> {
    return prisma.registration.findUnique({ where: { studentId } });
  }

  async findById(id: string): Promise<Registration | null> {
    return prisma.registration.findUnique({ where: { id } });
  }

  async updatePaymentStatus(id: string, paymentStatus: boolean): Promise<Registration> {
    return prisma.registration.update({
      where: { id },
      data: { paymentStatus },
    });
  }

  async updateCheckInStatus(id: string, checkedIn: boolean): Promise<Registration> {
    return prisma.registration.update({
      where: { id },
      data: { checkedIn },
    });
  }

  async findAll(): Promise<Registration[]> {
    return prisma.registration.findMany({
      include: {
        student: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });
  }
}

export const registrationRepository = new RegistrationRepository();
