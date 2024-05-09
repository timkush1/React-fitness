const express = require('express');
const FitnessExpense = require('../models/FitnessExpense');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all fitness expenses for the logged-in user
router.get('/', async (req, res) => {
  try {
    // Fetching expenses based on the user's ID stored in req.user
    const expenses = await FitnessExpense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Add a new fitness expense for the logged-in user
router.post('/', async (req, res) => {
  
  try {
    const { duration, activityType, date, notes } = req.body;
    const newExpense = new FitnessExpense({
      duration,
      activityType,
      date,
      notes,
      user: req.user.id // This is correct, assuming req.user.id is the user's Object ID
    });
    const expense = await newExpense.save();
    // console.log('tim3')
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Update a fitness expense for the logged-in user
router.put('/:id', async (req, res) => {
  try {
    const { duration, activityType, date, notes } = req.body;
    const expenseFields = { duration, activityType, date, notes };

    let expense = await FitnessExpense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });
    
    // Make sure user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    expense = await FitnessExpense.findByIdAndUpdate(
      req.params.id,
      { $set: expenseFields },
      { new: true }
    );

    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Delete a fitness expense for the logged-in user
router.delete('/:id', async (req, res) => {
  try {
    let expense = await FitnessExpense.findById(req.params.id); // נשלוף את הפרמטר של המספר זיהוי שנשלח מהפרונט
    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    // Make sure user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await FitnessExpense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Expense removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
