import express from 'express';
import { createUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/loginController.js';
const router = express.Router();

// Define routes
router.post('/register', createUser);
router.post('/login', loginUser);

export default router;