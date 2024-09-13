import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Add code to handle redirection or state update if needed
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="sidebar">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="#!" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
