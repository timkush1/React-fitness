// pages/welcome.js

import Image from 'next/image';
import { useState } from 'react';
import SignUpModal from './Auth/AuthModal'; // Assuming this component exists

export default function Welcome() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // Define the handlers for sign-up and login
  const handleSignUp = (formData) => {
    console.log('Sign Up Form Data:', formData);
    // Implement your sign-up logic here
    closeModal();
  };

  const handleLogin = (formData) => {
    console.log('Login Form Data:', formData);
    // Implement your login logic here
    closeModal();
  };

  // Function to switch between login and sign-up in the modal 
  //when we will change click on a button for switching in a used component it will change it here
  const switchForm = (type) => setModalType(type);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full"> {/* Use full width */}
        <div className="shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-96 w-full"> {/* Full-width hero image */}
            <Image
              src="/images/fitness-hero.png"
              alt="Fitness Background"
              layout="fill" // Use 'fill' for cover effect
              objectFit="cover" // Image will cover the area without stretching
              priority // Load image immediately
            />
          </div>
          <div className="p-6"> {/* Padding for content inside the card */}
            <h2 className="text-3xl font-bold">Welcome to Tim's FitTrack!</h2>
            <p className="mt-4 text-gray-600">
              Join our community and start your fitness journey with us. Track your workouts, set goals, and find inspiration.
            </p>
            <div className="pt-6 pb-6">
              <span className="flex items-center mb-4">
                <i className="far fa-clock fa-fw mr-2 text-gray-900"></i> Service Overview
              </span>
              <p className="text-sm">
                FitTrack offers personalized workout tracking, goal setting, educational resources, and a supportive community.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
        <button onClick={() => openModal('signup')} className="btn-primary">Sign Up</button>
        <button onClick={() => openModal('login')} className="btn-secondary">Login</button>
      </div>
          </div>
        </div>
      </div>
      {modalType && (
        <SignUpModal 
          onClose={closeModal} 
          formType={modalType} 
          switchForm={switchForm} 
          onSubmit={modalType === 'signup' ? handleSignUp : handleLogin}
        />
        )}
    </div>
  );
}
