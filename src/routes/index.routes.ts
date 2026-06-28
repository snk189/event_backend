import { Router } from 'express';
import authRoutes from './auth.routes';
import registrationRoutes from './registration.routes';
import ticketRoutes from './ticket.routes';
import paymentRoutes from './payment.routes';
import volunteerRoutes from './volunteer.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/registration', registrationRoutes);
router.use('/ticket', ticketRoutes);
router.use('/payment', paymentRoutes);
router.use('/volunteer', volunteerRoutes);

export default router;
