import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-8 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold">Fitness Tracker</h3>
          <p>Tracking your fitness journey with Tim Kushmaro </p>
          <div className="mt-2">
            <span>© {currentYear} FitTrack. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
