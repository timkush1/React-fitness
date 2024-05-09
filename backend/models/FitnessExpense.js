const mongoose = require('mongoose');

const fitnessExpenseSchema = new mongoose.Schema({
  duration: {
    type: Number, // Duration in minutes
    required: true
  },
  activityType: {
    type: String, // Type of fitness activity
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String // Additional notes
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Make sure this is the name of your user model
    required: true
  }
});

const FitnessExpense = mongoose.model('FitnessExpense', fitnessExpenseSchema);

module.exports = FitnessExpense;