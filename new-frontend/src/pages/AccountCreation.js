import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountCreation.css';

const AccountCreation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const validateEmail = (email) => {
    // Basic regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Basic regex for phone number validation (adjust pattern as needed)
    return /^\d{10,15}$/.test(phoneNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Invalid phone number');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/users/register`, {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      setMessage('Account created successfully!');
      setError('');
      handleReset();
      navigate('/login');
    } catch (err) {
      console.error('Error creating account:', err);
      setError(err.response?.data?.error || 'Error creating account. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setMessage('');
    setError('');
  };

  return (
    <div className="account">
      <div className="account-creation">
        <div className="form-container">
          <h1>Create Your Account</h1>
          <h4>It's quick and easy.</h4>
          <form id="createYourAccount" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                name="first_name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                name="last_name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail ID</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email ID"
                name="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                name="password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                name="phone_number"
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Sign up'}
              </button>
              <button type="button" onClick={handleReset} disabled={loading}>
                Reset
              </button>
            </div>

            {message && <div className="message success">{message}</div>}
            {error && <div className="message error">{error}</div>}
          </form>
          <div className="signup-link">
            <p><a href="/login">Already have an account?</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
