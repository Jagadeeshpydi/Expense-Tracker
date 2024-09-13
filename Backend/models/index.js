import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Expense Schema
const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Budget Schema
const budgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    monthlyBudget: { type: Number, required: true },
    foodBudget: { type: Number, required: true },
    utilitiesBudget: { type: Number, required: true },
    entertainmentBudget: { type: Number, required: true }
});

const Budget = mongoose.model('Budget', budgetSchema);

export { User, Expense, Budget };
