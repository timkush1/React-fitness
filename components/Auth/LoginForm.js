import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../util/AuthContext'; // Adjust the path to your AuthContext file


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize the Next.js router

  const { setAuthStatus } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(''); // Reset message
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to log in');
      }

      setAuthStatus(true); // Update authentication status
      
      console.log ('fffff');
      localStorage.setItem('token', data.token);
      
      localStorage.setItem('username', data.username);
      
      //craeting user and saving user
      const user = {username : data.username,
      email,
      password
      };
      localStorage.setItem('user', JSON.stringify(user));
      // Assuming the server's response includes a username field on successful login
      router.push(`/${data.username}`); // Redirect to the user-specific page

    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Login</h3>
      <input
        type="email"
        placeholder="Email"
        className="border px-4 py-2 rounded-md"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-4 py-2 rounded-md"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Login
      </button>
      {message && <p className={`text-sm ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
    </form>
  );
};

export default LoginForm;
