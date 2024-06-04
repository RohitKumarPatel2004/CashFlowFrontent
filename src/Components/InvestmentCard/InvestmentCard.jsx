import React, { useContext, useState } from 'react';
import axios from 'axios';
import { InvestmentContext } from '../Store/InvestmentContext';
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';

const InvestmentCard = ({ id, planName, price, dailyProfit, totalRevenue, days }) => {
  const { addInvestment } = useContext(InvestmentContext);
  const { getAuthDetails } = useAuth();
  const [error, setError] = useState('');

  const handleInvest = async () => {
    const { email } = getAuthDetails();

    try {
      // First API call to handle the transaction
      const transactionResponse = await axios.post('http://localhost:8001/api/transaction/handleTransaction', {
        email,
        type: 'investment',
        amount: parseFloat(price)
      });

      if (transactionResponse.data.success) {
        const newInvestment = {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          amount: price,
          dailyProfit,
        };
        addInvestment(newInvestment);

        // Second API call to store the investment details
        const investmentResponse = await axios.post(`${baseURL}/investment/handleInvestmentDetails`, {
          email,
          planName,
          price,
          dailyProfit,
          totalRevenue,
          days
        });

        if (investmentResponse.data.success) {
          alert(`Investment successful! New Balance: ₹${transactionResponse.data.newBalance.toFixed(2)}`);
        } else {
          setError(investmentResponse.data.message || 'Failed to store investment details');
        }
      } else {
        setError(transactionResponse.data.message || 'Failed to complete investment');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during the investment. Please try again.');
    }
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="bg-indigo-600 text-white p-4">
        <h2 className="text-center text-xl font-bold">{planName}</h2>
      </div>
      <div className="p-6 flex flex-col items-center">
        <div className="mb-4">
          <img src="path_to_image" alt="Investment Plan" className="w-16 h-16 object-cover" />
        </div>
        <div className="text-center">
          <p className="text-gray-600">Price: Rs. {price}</p>
          <p className="text-gray-600">Daily Profit: Rs. {dailyProfit}</p>
          <p className="text-gray-600">Total Revenue: Rs. {totalRevenue}</p>
          <p className="text-gray-600">Number of days: {days}</p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 text-center">
        <button
          onClick={handleInvest}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Invest
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default InvestmentCard;
