import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Use environment variable for API endpoint
  // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const validateEmail = (email) => {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const userCredentials = { email, password };
    setLoading(true); // Set loading to true
    setError(''); // Reset error state on new submit

    try {
      const response = await axios.post(`http://localhost:5000/api/users/login`, userCredentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log response for debugging
      console.log('Response data:', response.data);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      console.log('Token stored:', localStorage.getItem('token')); // Verify token storage

      // Redirect to home page after successful login
      navigate('/home', { replace: true });
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        const errorMessage = error.response.data?.error || 'Login failed. Please check your details.';
        setError(errorMessage);
      } else if (error.request) {
        setError('No response received from the server.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <header>Expense Tracker</header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="head">E-mail ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail ID"
            disabled={loading} // Disable input while loading
            required
          />
          <label htmlFor="password" className="head">Password</label>
          <input
            type="password"
            id="password"
            value={password}
    
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading} // Disable input while loading
            required
            
          />
          
          <button type="submit" disabled={loading || !email || !password}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <div className="message error">{error}</div>}

        <div className="signup-link">
          <p>New user? <a href="/account-creation">Please create an account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
