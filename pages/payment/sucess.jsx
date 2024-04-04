import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg">Your payment has been processed successfully.</p>
        <p className="text-lg mt-4">Thank you for your business.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;