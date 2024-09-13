import express from 'express';
import fetchDataFromAnotherService from '../controllers/fetchDataController.js';

const router = express.Router();

// Define the route that uses the fetchDataFromAnotherService function
router.get('/data', fetchDataFromAnotherService);

export default router;
