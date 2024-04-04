import React from 'react';

const PaymentFailure = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Payment Failed!</h1>
        <p className="text-lg">Sorry, your payment could not be processed.</p>
        <p className="text-lg mt-4">Please try again or contact support.</p>
      </div>
    </div>
  );
};

export default PaymentFailure;