import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle } from 'react-icons/fa';
import Container from '../components/layouts/Container';

const PaymentCancelled = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-[60vh] flex items-center justify-center font-pop">
      <Container>
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg mx-auto">
          <div className="text-yellow-500 mb-6 flex justify-center">
            <FaTimesCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h2>
          <p className="text-gray-600 mb-8">
            The payment process was cancelled. Your order has not been placed. You can return to your cart to complete the purchase whenever you are ready.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/cart" className="w-full py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-900 transition">
              Return to Cart
            </Link>
            <Link to="/" className="w-full py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition">
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentCancelled;