import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.get('/', authenticateToken, getExpenses);
router.post('/', authenticateToken, addExpense);
router.put('/:id', authenticateToken, updateExpense);
router.delete('/:id', authenticateToken, deleteExpense);

export default router;
