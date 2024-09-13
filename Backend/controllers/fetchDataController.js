import axios from 'axios';

// Controller function to fetch data from another service
const fetchDataFromAnotherService = async (req, res) => {
  try {
    const response = await axios.get('http://external-service.com/api/endpoint');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from external service:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export default fetchDataFromAnotherService;