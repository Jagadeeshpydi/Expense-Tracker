// components/MyComponent.jsx
import React from 'react';
import { useMyContext } from '../context/MyContext';

const MyComponent = () => {
  const context = useMyContext();

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const { basename } = context;

  return <div>Base name is: {basename}</div>;
};

export default MyComponent;
