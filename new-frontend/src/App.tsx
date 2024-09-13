// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { MyProvider } from './context/MyContext'; // Ensure MyProvider is a named export

const App: React.FC = () => { // Define component type as React.FC for functional components
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </MyProvider>
  );
};

export default App;
