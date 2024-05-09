// components/SignUpModal.js

import React from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

function SignUpModal({ onClose, formType, switchForm }) {
  // Prevent click events inside the modal content from closing the modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose} // Close modal when clicking on the backdrop
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={handleModalContentClick} // Prevent clicks from closing the modal
      >
        <div className="mt-3 text-center">
          {formType === 'signup' ? <SignUpForm /> : <LoginForm />}

          <button 
            onClick={onClose} 
            className="mt-4 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Close
          </button>
          
          {formType === 'signup' ? (
            <button onClick={() => switchForm('login')} className="mt-4 text-blue-600 hover:text-blue-800 text-sm">
              Already have an account? Log in
            </button>
          ) : (
            <button onClick={() => switchForm('signup')} className="mt-4 text-blue-600 hover:text-blue-800 text-sm">
              Need an account? Sign up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
