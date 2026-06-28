import prisma from '../lib/prisma';
import { Prisma, Ticket } from '@prisma/client';

export class TicketRepository {
  async create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    return prisma.ticket.create({ data });
  }

  async findByRegistrationId(registrationId: string): Promise<Ticket | null> {
    return prisma.ticket.findUnique({ where: { registrationId } });
  }
}

export const ticketRepository = new TicketRepository();
