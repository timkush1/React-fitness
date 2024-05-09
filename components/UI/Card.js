import React from 'react';

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
