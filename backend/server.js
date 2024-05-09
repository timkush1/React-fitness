const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/authMiddleware'); // This is the correct path
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
const authRoutes = require('./routes/authRoutes'); // These routes should NOT have authMiddleware applied
app.use('/api/auth', authRoutes); // Mount the auth routes WITHOUT authMiddleware


// Protected expense routes
const expenseRoutes = require('./routes/expenseRoutes'); // Make sure this file exists and has the correct route definitions
app.use('/api/expenses', authMiddleware, expenseRoutes); // Apply authMiddleware here

// const fitnessExpenseRoutes = require('./routes/fitnessExpenseRoutes'); // Update to your fitness expense routes file
// app.use('/api/fitnessExpenses', authMiddleware, fitnessExpenseRoutes); // Apply authMiddleware here


// Example of a protected route (you will create this file and its routes)
// const financeRoutes = require('./routes/financeRoutes');
// app.use('/api/finance', authMiddleware, financeRoutes); // Apply authMiddleware here

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
