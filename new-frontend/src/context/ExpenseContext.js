import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api'; // Adjust the path if necessary

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token used in request:', token); // Verify token is being used

      if (!token) {
        setError('Authentication token is required.');
        return;
      }

      const response = await api.get('/expenses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setExpenses(response.data);
      setError(''); // Clear any previous errors on successful fetch
    } catch (err) {
      console.error('Error fetching expenses:', err.response ? err.response.data : err.message);
      setError('Failed to fetch expenses. Please check your authentication and try again.');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <ExpenseContext.Provider value={{ expenses, fetchExpenses, error }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use the ExpenseContext
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
