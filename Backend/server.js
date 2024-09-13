// backend/server.js
import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js'; // Import the DB connection function
import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js'; // Import the expense routes

const app = express();
// const PORT = process.env.PORT || 5000;

// CORS Middleware setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Dynamic origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/users', userRoutes); // User-related operations
app.use('/api/expenses', expenseRoutes); // Expense-related operations

// MongoDB Connection
connectDB()
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Handle 404 errors (Route not found)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server is running `);
});
