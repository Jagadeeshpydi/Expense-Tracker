import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  },
  date: {
    type: Date,
    required: true,
    default: Date.now // Default to current date if not provided
  },
  category: {
    type: String,
    required: true,
    enum: ['Entertainment', 'Food', 'Traveling', 'Others'] // Optional: Restrict to specific categories
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive'] // Validation to ensure amount is non-negative
  },
  description: {
    type: String,
    required: true,
    trim: true // Trim whitespace from description
  }
});

export default mongoose.model('Expense', ExpenseSchema);
