import { z } from 'zod';

export const checkinSchema = z.object({
  body: z.object({
    qrData: z.string().uuid('Invalid QR code data. Must be registration ID'),
  }),
});
