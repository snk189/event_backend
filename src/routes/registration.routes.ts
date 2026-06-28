import { Router } from 'express';
import { registrationController } from '../controllers/registration.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateUser);

router.post('/', registrationController.register);

export default router;
