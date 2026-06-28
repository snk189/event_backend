import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { validate } from '../middleware/validation.middleware';
import { paymentConfirmSchema } from '../validations/registration.validation';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateUser);

router.post('/confirm', validate(paymentConfirmSchema), paymentController.confirmPayment);

export default router;
