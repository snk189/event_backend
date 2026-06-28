import { Router } from 'express';
import { ticketController } from '../controllers/ticket.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateUser);

router.get('/', ticketController.getTicket);

export default router;
