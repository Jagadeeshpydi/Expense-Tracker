// src/pages/Contact/Contact.js
import React from 'react';
import './Contact.css'; // Import the specific CSS for the Contact page


const Contact = () => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>
      <main className="contact-main">
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
