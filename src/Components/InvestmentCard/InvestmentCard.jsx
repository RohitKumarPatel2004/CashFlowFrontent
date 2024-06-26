import React, { useContext, useState } from 'react';
import axios from 'axios';
import { InvestmentContext } from '../Store/InvestmentContext';
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';
import logo from "../../Assets/HeaderImages/bundle1.png";
import Popup from '../AlertPage/Popup';

const InvestmentCard = ({ id, planName, price, dailyProfit, totalRevenue, days, type }) => {
  const { addInvestment } = useContext(InvestmentContext);
  const { getAuthDetails } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const isDisabled = type === 'disable';

  const handleInvest = async () => {
    const { email } = getAuthDetails();
    setLoading(true);
    setError('');

    try {
      const transactionResponse = await axios.post(`${baseURL}/transaction/handleTransaction`, {
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

        const investmentResponse = await axios.post(`${baseURL}/investment/handleInvestmentDetails`, {
          email,
          planName,
          price,
          dailyProfit,
          totalRevenue,
          days
        });

        if (investmentResponse.data.success) {
          setPopup({
            show: true,
            message: `Investment successful! New Balance: ₹${transactionResponse.data.newBalance.toFixed(2)}`,
            type: 'success'
          });
        } else {
          setError(investmentResponse.data.message || 'Failed to store investment details');
          setPopup({
            show: true,
            message: investmentResponse.data.message || 'Failed to store investment details',
            type: 'error'
          });
        }
      } else {
        setError(transactionResponse.data.message || 'Failed to complete investment');
        setPopup({
          show: true,
          message: transactionResponse.data.message || 'Failed to complete investment',
          type: 'error'
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during the investment. Please try again.');
      setPopup({
        show: true,
        message: error.response?.data?.message || 'An error occurred during the investment. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: '', type: '' });
  };

  return (
    <>
      <div className={`max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden my-4 transform transition duration-500 hover:scale-105 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4">
          <h2 className="text-center text-2xl font-bold">{planName}</h2>
        </div>
        <div className="p-6 flex flex-col items-center">
          <div className="mb-4">
            <img src={logo} alt="Investment Plan" className="w-24 h-24 object-cover rounded-full shadow-lg border-4 border-white" />
          </div>
          <div className="text-center mb-4">
            <p className="text-gray-800 text-lg font-semibold">Price: Rs. {price}</p>
            <p className="text-gray-800 text-lg font-semibold">Daily Profit: Rs. {dailyProfit}</p>
            <p className="text-gray-800 text-lg font-semibold">Total Revenue: Rs. {totalRevenue}</p>
            <p className="text-gray-800 text-lg font-semibold">Days: {days}</p>
          </div>
          <button
            onClick={handleInvest}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full transition duration-300 ${loading || isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || isDisabled}
          >
            {loading ? 'Investing...' : 'Invest Now'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default InvestmentCard;
