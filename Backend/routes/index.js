import express from 'express';
import userRoutes from './userRoutes.js';
import expenseRoutes from './expenseRoutes.js';
import budgetRoutes from './budgetRoutes.js';
import { authenticateToken } from '../middleware/index.js'; // Adjust import path

const router = express.Router();

// Public routes
router.use('/users', userRoutes);    // Routes related to users
router.use('/expenses', expenseRoutes); // Routes related to expenses
router.use('/budget', budgetRoutes);  // Routes related to budgets

// Protected route (authentication required)
router.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

export default router;
