import React from 'react';
import Button from '../../UI/Button'; // Adjust the import path as necessary

const AddExpenseForm = ({
  activityType,
  setActivityType,
  duration,
  setDuration,
  date,
  setDate,
  notes,
  setNotes,
  isSubmitting,
  addFeedback,
  onAddExpense // Passed down from Dashboard.js
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddExpense(); // Calls the handleAddExpense function from Dashboard.js
  };

  return (
    <div>
      {addFeedback && <div className="feedback">{addFeedback}</div>}
      <form onSubmit={handleSubmit} className="expense-form space-y-4">
        {/* Activity Type Input */}
        <div className="form-group">
          <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">
            Activity Type
          </label>
          <input
            type="text"
            id="activityType"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            required
            className="form-input"
          />
        </div>
        {/* Duration Input */}
        <div className="form-group">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="form-input"
          />
        </div>
        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </div>
        {/* Notes Textarea */}
        <div className="form-group">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-textarea"
          />
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          Add Expense
        </Button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
