// services/api.js

export const fetchExpenses = async () => {
    const response = await fetch('http://localhost:5000/api/expenses', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE' // Replace with your token management logic
      }
    });
  
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
  