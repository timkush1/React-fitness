import React, { useState, useEffect } from "react";
import Card from "../UI/Card"; // Ensure this path is correct
import Button from "../UI/Button"; // Ensure this path is correct
import processDataForChart from "@/util/processData";
import LineChart from "../UI/LineChart ";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityType, setActivityType] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [addFeedback, setAddFeedback] = useState("");
  const [deleteFeedback, setDeleteFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // for preventing multiple submission

  // Define fetchExpenses outside of useEffect so it can be called again after adding an expense
  const fetchExpenses = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // setFeedback("Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Clear feedback after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAddFeedback("");
      setDeleteFeedback("");
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [addFeedback, deleteFeedback]);

  const handleAddExpense = async () => {
    setIsSubmitting(true); // Disable the button
    const token = localStorage.getItem("token"); // Retrieve the token here as well
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const expenseData = {
      activityType,
      duration: Number(duration),
      date: new Date(date),
      notes,
    };

    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token here (why do we need that?)
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense. Please try again.");
      }

      const result = await response.json();
      setExpenses([...expenses, result]);
      setAddFeedback("Expense added successfully!");
      // Clear the form fields
      setActivityType("");
      setDuration("");
      setDate("");
      setNotes("");
      setIsSubmitting(false); // Re-enable the button after attempt
      await fetchExpenses(); // refresh the list of expenses
    } catch (error) {
      setIsSubmitting(false); // Re-enable the button after attempt
      setAddFeedback(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddExpense();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteExpense = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setDeleteFeedback("Authentication token not found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense.");
      }

      // Remove the deleted expense from the state
      setExpenses(expenses.filter((expense) => expense._id !== id));
      setDeleteFeedback("Expense deleted successfully!");
    } catch (error) {
      setDeleteFeedback(error.message);
    }
  };


  
  
  // A simple function to get random color for the chart lines
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartData = processDataForChart(expenses);

  return (
    <div className="dashboard p-4" >
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {deleteFeedback && (
          <div className="delete-feedback">{deleteFeedback}</div>
        )}

        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <Card
              key={expense._id}
              className="p-4 hover:bg-blue-100 transition duration-300 ease-in-out"
            >
              <div className="text-lg font-semibold text-blue-600">
                Activity: {expense.activityType}
              </div>
              <div className="text-md text-gray-700">
                Duration: {expense.duration} minutes
              </div>
              <div className="text-sm text-gray-500">
                Date: {new Date(expense.date).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">
                Notes: {expense.notes}
              </div>
              <button
                onClick={() => handleDeleteExpense(expense._id)}
                className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
              >
                Delete
              </button>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center">No expenses to show</div>
        )}
      </div>
      <Card className="mb-4 bg-orange-100 p-6 shadow-md hover:bg-orange-200 transition duration-300 ease-in-out rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Expense</h2>
        <form onSubmit={handleSubmit} className="expense-form space-y-4">
          <div className="form-group">
            <label
              htmlFor="activityType"
              className="block text-sm font-medium text-gray-700"
            >
              Activity Type
            </label>
            <select
              id="activityType"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select an activity</option>
              <option value="run">Run</option>
              <option value="cycling">Cycling</option>
              <option value="chest workout">Chest Workout</option>
              <option value="Back workout">Back Workout</option>
              <option value="arms workout">Arms Workout</option>
              <option value="legs workout">Legs Workout</option>
            </select>
          </div>
          <div className="form-group">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting} // Button is disabled when isSubmitting is true
            className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Expense
          </Button>
          {addFeedback && (
            <div className="feedback text-center text-sm mt-4 ">
              {addFeedback}
            </div>
          )}
        </form>
      </Card>
      {!loading && expenses.length > 0 && <LineChart data={chartData} />}  
    </div>
  );
};

export default Dashboard;
