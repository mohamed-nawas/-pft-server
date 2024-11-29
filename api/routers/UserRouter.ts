import { UserController } from '../controllers/UserController';
import express from 'express';

/**
 * User router
 */
const router = express.Router();
const controller = new UserController();

router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;