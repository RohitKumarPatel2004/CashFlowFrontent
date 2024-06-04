import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-gray-700 mb-4">
          Welcome to CashGenerate, your number one source for all things related to investment and profit generation. We're dedicated to providing you the very best of financial services, with an emphasis on reliability, customer service, and uniqueness.
        </p>
        <p className="text-gray-700 mb-4">
          Founded in 2024, CashGenerate has come a long way from its beginnings. When we first started out, our passion for providing the best financial strategies drove us to start our own business.
        </p>
        <p className="text-gray-700 mb-4">
          We hope you enjoy our services as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>
        <p className="text-gray-700 mb-4">
          Sincerely, <br />
          The CashGenerate Team
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
