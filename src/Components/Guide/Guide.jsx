import React from 'react';

const Guide = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Guide to Using CashGenerate</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Getting Started</h2>
          <p className="text-gray-700">
            Welcome to CashGenerate! To start using our services, follow these simple steps:
          </p>
          <ol className="list-decimal list-inside mt-2 text-gray-700">
            <li>Sign up for an account using your email and create a secure password.</li>
            <li>Verify your email address through the verification link sent to your email.</li>
            <li>Log in to your account using your credentials.</li>
            <li>Complete your profile by adding your personal information.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Managing Your Profile</h2>
          <p className="text-gray-700">
            Keep your profile up to date to ensure you receive the best services:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Navigate to your profile page by clicking on your profile icon.</li>
            <li>Update your location and contact details as needed.</li>
            <li>Upload a profile picture for a personalized experience.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Making Investments</h2>
          <p className="text-gray-700">
            Follow these steps to make an investment:
          </p>
          <ol className="list-decimal list-inside mt-2 text-gray-700">
            <li>Go to the "Investments" section from the main menu.</li>
            <li>Select an investment plan that suits your needs.</li>
            <li>Enter the amount you wish to invest and confirm the details.</li>
            <li>Track your investments from your dashboard.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Withdrawing Profits</h2>
          <p className="text-gray-700">
            You can withdraw your profits easily:
          </p>
          <ol className="list-decimal list-inside mt-2 text-gray-700">
            <li>Navigate to the "Withdraw" section from the main menu.</li>
            <li>Enter the amount you wish to withdraw.</li>
            <li>Confirm the transaction details and submit your request.</li>
            <li>Check your email for confirmation and track the withdrawal status.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Customer Support</h2>
          <p className="text-gray-700">
            Need help? Our customer support team is here for you:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Visit the "Customer Service" page from the main menu.</li>
            <li>Fill out the contact form with your query or issue.</li>
            <li>Our support team will get back to you within 24 hours.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">FAQs</h2>
          <p className="text-gray-700">
            Have questions? Check out our <a href="/faqs" className="text-blue-500 hover:underline">FAQs page</a> for common queries and their answers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Guide;
