import { z } from 'zod';

export const registrationSchema = z.object({
  body: z.object({
    // the auth token provides the student id
    // we just need a POST without body for registration usually, or maybe some extra details.
    // the prompt mentions registrationNumber is generated or provided? "Simulate payment confirmation." 
    // Usually, student just hits POST /registration and it creates one if they don't have it.
  }).passthrough(),
});

export const paymentConfirmSchema = z.object({
  body: z.object({
    registrationId: z.string().uuid('Invalid registration ID'),
  }),
});
