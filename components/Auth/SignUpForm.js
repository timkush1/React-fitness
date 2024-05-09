import React, { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message
    setSuccessMessage(''); // Reset success message
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign up');
      }

      // Handle success
      setSuccessMessage('Registration successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Sign Up</h3>
      <input
        type="text"
        placeholder="Username"
        className="border px-4 py-2 rounded-md"
        required
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="email"
        placeholder="Email"
        className="border px-4 py-2 rounded-md"
        required
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="border px-4 py-2 rounded-md"
        required
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Sign Up
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
    </form>
  );
};

export default SignUpForm;
