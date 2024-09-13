// src/pages/About.js
import React from 'react';
import './About.css'; // Import the CSS file for styling
import Sidebar from './Sidebar';

const About = () => {
  return (
    <>
    <Sidebar/>
    <div className='main-content2'>
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to the Expense Tracker application! Our goal is to help you manage your finances 
        effectively by providing a user-friendly interface to track your expenses and budget.
      </p>
      
      <section>
        <h2>Purpose</h2>
        <p>
          The Expense Tracker app is designed to simplify the process of managing personal and 
          household expenses. Whether you're a student, a professional, or anyone looking to keep 
          better track of their spending, our app provides the tools you need to monitor and 
          control your financial activities.
        </p>
      </section>
      
      <section >
        <h2>Features</h2>
        <ul className='pad'>
          <li>Track your daily expenses with ease</li>
          <li>Categorize expenses to identify spending patterns</li>
          <li>Add, update, and delete expenses effortlessly</li>
          <li>Generate  visualizations for better insights</li>
         
          <li>Secure login and data protection</li>
        </ul>
      </section>
      
      <section>
        <h2>Technology Stack</h2>
        <p>
          Our application is built using modern web technologies to ensure a seamless user experience:
        </p>
        <ul className='pad'>
          <li><strong>Frontend:</strong> React.js for dynamic and responsive UI</li>
          <li><strong>Backend:</strong> Node.js and Express.js for robust server-side operations</li>
          <li><strong>Database:</strong> MongoDB for scalable and flexible data storage</li>
          <li><strong>Deployment:</strong> Hosted on Vercel for reliable performance</li>
        </ul>
      </section>
      
      <section>
        <h2>Benefits</h2>
        <p>
          Using our Expense Tracker app provides you with the following benefits:
        </p>
        <ul className='pad'>
          <li>Gain better control over your spending habits</li>
          <li>Make informed financial decisions with detailed reports</li>
          <li>Save time with an intuitive and easy-to-use interface</li>
          <li>Stay organized with automatic categorization and tracking</li>
        </ul>
      </section>
      
      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us:
        </p>
        <p>
          <strong>Email:</strong> jagadeeshpydi143@gmail.com
        </p>
        
        <p>
          We're here to assist you and ensure you have the best experiences!
        </p>
      </section>
      <footer className="footer">
      <div className="footer-content">
    <p>&copy; {new Date().getFullYear()} Jagadeesh Pydi. All rights reserved.</p>
  </div>
</footer>

    </div>
    </div>
    </>
  );
};

export default About;
