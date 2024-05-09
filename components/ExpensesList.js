// components/ExpensesList.js

import { useQuery } from '@tanstack/react-query';
import { fetchExpenses } from '../services/api'; // Ensure this is the correct path to your fetchExpenses function

function ExpensesList() {
  // Adjust the useQuery call to the new API
  const { data, error, isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;

  // Render your expenses here using data
  return (
    <div className="expenses-list">
      {data && data.map(expense => (
        <div key={expense.id} className="expense-item">
          <h3>{expense.description}</h3>
          <div className="expense-details">
            <p>Category: {expense.category}</p>
            <p>Amount: ${expense.amount.toFixed(2)}</p> // Assuming amount is a number
            <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpensesList;
