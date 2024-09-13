import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SomeComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data'); // Fetch data from your backend
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default SomeComponent;
