import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the token

    const expenses = await Expense.find({ userId }); // Fetch expenses for the authenticated user
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    res.status(500).json({ error: 'Error fetching expenses', details: error.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { date, category, amount, description } = req.body;
    const userId = req.user.id; // Extracted from the token

    // Basic validation (should be enhanced based on requirements)
    if (!date || !category || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }

    // Create a new expense instance
    const newExpense = new Expense({
      date,
      category,
      amount,
      description,
      userId // Associate expense with the authenticated user
    });

    // Save the expense to the database
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error('Error creating expense:', error.message);
    res.status(500).json({ error: 'Error creating expense', details: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id; // Extracted from the token

    // Filter out unwanted fields like _id and __v
    const { _id, __v, ...filteredUpdateData } = updateData;

    // Check if expense exists and belongs to the authenticated user before updating
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId }, // Match by expense ID and user ID
      filteredUpdateData,
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      console.error('Expense not found or does not belong to user for ID:', id);
      return res.status(404).json({ error: 'Expense not found or does not belong to user' });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error.message);
    res.status(500).json({ error: 'Error updating expense', details: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Extracted from the token

    // Check if expense exists and belongs to the authenticated user before deleting
    const deletedExpense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!deletedExpense) {
      console.error('Expense not found or does not belong to user for ID:', id);
      return res.status(404).json({ error: 'Expense not found or does not belong to user' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error.message);
    res.status(500).json({ error: 'Error deleting expense', details: error.message });
  }
};
