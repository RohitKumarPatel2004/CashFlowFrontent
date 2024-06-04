import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';

const WithdrawPage = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [tradePassword, setTradePassword] = useState('');
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
          alert('Failed to fetch balance');
        }
      } catch (error) {
        console.error('Error fetching balance', error);
        alert('Error fetching balance');
      }
    };

    fetchBalance();
  }, [getAuthDetails]);

  const handleNextClick = async () => {
    const { email } = getAuthDetails();
    if (withdrawAmount && tradePassword) {
      try {
        const response = await axios.post('http://localhost:8001/api/transaction/handleTransaction', {
          email,
          type: 'withdrawal',
          amount: parseFloat(withdrawAmount),
          password: tradePassword
        });

        if (response.data.success) {
          alert(`Transaction successful. New Balance: ₹${response.data.newBalance.toFixed(2)}`);
          navigate('/mine');
        } else {
          alert(response.data.message || 'Failed to complete transaction');
        }
      } catch (error) {
        console.error('Error during transaction', error);
        alert(error.response?.data?.message || 'An error occurred during the transaction. Please try again.');
      }
    } else {
      alert('Please enter withdrawal amount and trade password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Withdraw</h2>
        <p className="text-center text-gray-600 mb-4">Withdraw Balance: ₹{currentBalance.toFixed(2)}</p>

        <div className="mb-6">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="w-full py-3 mb-4 rounded-lg border border-gray-300 px-3"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            value={tradePassword}
            onChange={(e) => setTradePassword(e.target.value)}
            className="w-full py-3 mb-4 rounded-lg border border-gray-300 px-3"
            placeholder="Please enter your trade password"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Withdraw Instructions</h3>
          <div className="bg-orange-100 p-4 rounded-lg border border-orange-500">
            <p>Daily Withdrawal Time: 10:00:00 ~ 20:30:00</p>
            <p>Minimum Single Withdrawal Amount: ₹200.00</p>
            <p>Maximum Single Withdrawal Amount: ₹50,000.00</p>
            <p>Minimum Single Withdrawal Unit Amount: ₹100.00</p>
            <p>Withdrawal Tax Rate: 4%</p>
            <p>Number of withdrawals per day: 1</p>
          </div>
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
    </div>
  );
};

export default WithdrawPage;
