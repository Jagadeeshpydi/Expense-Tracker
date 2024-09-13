import React from 'react';
import { useMyContext } from './context/MyContext'; // Adjust the import path as needed

const LinkWithRef = () => {
  const { basename } = useMyContext(); // Access context value

  return <div>{basename}</div>;
};

export default LinkWithRef;
