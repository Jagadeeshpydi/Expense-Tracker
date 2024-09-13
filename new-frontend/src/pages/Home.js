import React, { useState } from 'react';
import api from '../api';
import { useExpenses } from '../context/ExpenseContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../pages/Sidebar'; // Ensure the path is correct
import './Home.css';

const Home = () => {
  const { fetchExpenses } = useExpenses();
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !category || !amount || Number(amount) <= 0) {
      setError('Please fill in all fields with valid information, and ensure the amount is greater than 0.');
      return;
    }

    const newExpense = { date, category, amount, description };
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication required. Please log in again.');
      return;
    }

    try {
      const response = await api.post('http://localhost:5000/api/expenses', newExpense, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Expense added:', response.data);
      await fetchExpenses();
      setDate('');
      setCategory('');
      setAmount('');
      setDescription('');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        const errorMessage = error.response ? error.response.data.error : error.message || 'An unknown error occurred';
        console.error('Error adding expense:', errorMessage);
        setError('Failed to add expense. Please try again.');
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-content1">
        <div className="home-container1">
          <div className="description-form-container">
            <div className="description">
              <h4>Key Features of the Expense Tracker:</h4>
              <ul>
                <li>Expense Recording: Easily log and categorize expenses.</li>
                <li>Financial Insights: Visualize spending patterns through charts.</li>
                <li>Budget Management: Monitor and control your budget effectively.</li>
                <li>User-Friendly: Simple and intuitive interface for ease of use.</li>
                <li>Progress Tracking: Keep track of financial progress over time.</li>
              </ul>
              <p>
                The "Add Expense" feature allows users to input details like date, category, amount, and description.
                It helps in tracking spending, managing budgets, and analyzing financial habits.
              </p>
            </div>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group1">
                  <header>Add Your Expenses</header>
                  <label htmlFor="date">Date</label><br />
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group1">
                  <label htmlFor="category1">Category</label><br />
                  <select
                    id="category1"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">--Select Category--</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Food">Food</option>
                    <option value="Traveling">Traveling</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group1">
                  <label htmlFor="amount">Amount</label><br />
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group1">
                  <label htmlFor="description">Description</label><br />
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add description"
                  />
                </div>
                <button type="submit">Add Expense</button>
                {error && <p className="error-message">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
