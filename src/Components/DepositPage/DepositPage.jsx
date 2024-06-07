import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';
import Popup from '../AlertPage/Popup';

const DepositPage = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();
  const { getAuthDetails } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      const { email } = getAuthDetails();
      try {
        const response = await axios.post(`${baseURL}/profile/getprofile`, { email });
        if (response.data.success) {
          setCurrentBalance(response.data.userData.balance);
        } else {
          console.error('Failed to fetch balance');
        }
      } catch (error) {
        console.error('Error fetching balance', error);
      }
    };

    fetchBalance();
  }, []);

  const handleNextClick = async () => {
    if (selectedAmount && selectedChannel) {
      try {
        const { email } = getAuthDetails();
        const response = await axios.post(`${baseURL}/transaction/handleTransaction`, {
          email,
          type: 'deposit',
          amount: parseFloat(selectedAmount)
        });

        if (response.data.success) {
          setCurrentBalance(response.data.newBalance);
          setPopup({
            show: true,
            message: `Deposit successful! New Balance: ₹${response.data.newBalance.toFixed(2)}`,
            type: 'success'
          });
          setTimeout(() => {
            navigate('/mine');
          }, 2000);
        } else {
          setPopup({
            show: true,
            message: 'Transaction failed: ' + response.data.message,
            type: 'error'
          });
        }
      } catch (error) {
        console.error('Error processing transaction', error);
        setPopup({
          show: true,
          message: 'Error processing transaction',
          type: 'error'
        });
      }
    } else {
      setPopup({
        show: true,
        message: 'Please select an amount and a deposit channel',
        type: 'error'
      });
    }
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: '', type: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Deposit</h2>
        <p className="text-center text-gray-600 mb-4">Current Balance: ₹{currentBalance}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[780, 2000, 5000, 10000, 20000, 50000].map((amount) => (
            <button
              key={amount}
              className={`py-4 rounded-lg text-white text-center ${
                selectedAmount === amount.toString() ? 'bg-blue-700' : 'bg-blue-500'
              }`}
              onClick={() => setSelectedAmount(amount.toString())}
            >
              ₹{amount}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="number"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
            className="w-full py-3 mb-4 rounded-lg border border-gray-300 px-3"
            placeholder="₹ Enter amount"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select the Deposit Channel</h3>
          {['Pay 100-500', 'Pay 100-5000', 'Pay 100-50000', 'Pay 100-500000'].map((channel, index) => (
            <button
              key={index}
              className={`w-full py-3 mb-2 rounded-lg border ${
                selectedChannel === channel ? 'border-orange-500 bg-orange-100' : 'border-gray-300'
              }`}
              onClick={() => setSelectedChannel(channel)}
            >
              {channel}
              <span className="float-right">₹100 - ₹50000</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => navigate('/mine')}
          >
            Back
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default DepositPage;
