import { Router } from 'express';
import { volunteerController } from '../controllers/volunteer.controller';
import { validate } from '../middleware/validation.middleware';
import { checkinSchema } from '../validations/volunteer.validation';
import { authenticateUser, authorizeVolunteer } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateUser);
router.use(authorizeVolunteer);

router.get('/registrations', volunteerController.getRegistrations);
router.post('/checkin', validate(checkinSchema), volunteerController.checkIn);

export default router;
