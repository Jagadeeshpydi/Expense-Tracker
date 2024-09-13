// src/hooks/useFetchExpenses.js
import { useState, useEffect } from 'react';
import api from '../api'; // Adjust the path if necessary

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token used in request:', token); // Verify token is being used

      if (!token) {
        throw new Error('Authentication token is required');
      }

      const response = await api.get('/expenses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setExpenses(response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching expenses:', error.response ? error.response.data : error.message);
      setError('Failed to fetch expenses. Please check your authentication and try again.');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []); // Fetch expenses on component mount

  return { expenses, error };
};

export default useFetchExpenses;
