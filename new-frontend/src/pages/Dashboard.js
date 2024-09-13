import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseTable from '../components/ExpenseTable';
import '../pages/Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const { expenses, fetchExpenses } = useExpenses();
  const [editIndex, setEditIndex] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});
  const [filterMonth, setFilterMonth] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  // const apiUrl = 'http://localhost:5000/api/expenses/';

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchExpenses();
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
    initializeData();
  }, [fetchExpenses]);

  const token = localStorage.getItem('token'); // Retrieve token

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedExpense({ ...expenses[index] });
  };

  const handleSaveClick = async () => {
    try {
      const { _id, __v, ...dataToUpdate } = editedExpense;

      const response = await axios.put(`http://localhost:5000/api/expenses/${_id}`, dataToUpdate, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Expense updated successfully', response.data);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteClick = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Expense deleted successfully');
      await fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense({ ...editedExpense, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'month') {
      setFilterMonth(value);
    } else if (name === 'category') {
      setFilterCategory(value);
      const uniqueCategories = [...new Set(expenses.map(expense => expense.category))];
      setCategorySuggestions(
        uniqueCategories.filter(category => category.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  const handleShowAllClick = () => {
    setFilterMonth('');
    setFilterCategory('');
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseMonth = new Date(expense.date).toISOString().slice(0, 7);
    const matchesMonth = filterMonth ? expenseMonth === filterMonth : true;
    const matchesCategory = filterCategory ? expense.category === filterCategory : true;
    return matchesMonth && matchesCategory;
  });

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-container">
          <div className="content1">
            <h1>Expense List</h1>

            <div className="filters">
              <label>
                Month:
                <input
                  type="month"
                  name="month"
                  value={filterMonth}
                  onChange={handleFilterChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={filterCategory}
                  onChange={handleFilterChange}
                  placeholder="Enter category"
                  list="category-list"
                />
                <datalist id="category-list">
                  {categorySuggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                  ))}
                </datalist>
              </label>
              <button className="show-all-btn" onClick={handleShowAllClick}>Show All</button>
            </div>

            <ExpenseTable
              expenses={filteredExpenses}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onSave={handleSaveClick}
              editIndex={editIndex}
              editedExpense={editedExpense}
              onChange={handleChange}
              setEditIndex={setEditIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
