import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';
import InvestmentSummary from '../InvestmentSummary/InvestmentSummary';  // Import the InvestmentSummary component

const Profit = () => {
  const { getAuthDetails } = useAuth();
  const { email } = getAuthDetails();

  const [balance, setBalance] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [todaysIncome, setTodaysIncome] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchProfitData = async () => {
      try {
        const response = await axios.post(`${baseURL}/profit/handleProfit`, { email });
        if (response.data.success) {
          const { totalDailyProfit, totalInvestment, totalBalance } = response.data;
          setBalance(totalBalance);
          setTotalInvestment(totalInvestment);
          setTotalIncome(totalDailyProfit);
        } else {
          console.error('Failed to fetch profit data');
        }
      } catch (error) {
        console.error('Error fetching profit data:', error);
      }
    };

    const fetchTodaysIncome = async () => {
      try {
        const response = await axios.post(`${baseURL}/profit/handleOneProfit`, {
          email,
          date: new Date().toISOString().split('T')[0]
        });
        if (response.data.success) {
          setTodaysIncome(response.data.oneDayProfit);
        } else {
          console.error('Failed to fetch today\'s income');
        }
      } catch (error) {
        console.error('Error fetching today\'s income:', error);
      }
    };

    fetchProfitData();
    fetchTodaysIncome();
  }, [email]);


  return (
    <div className="container mx-auto p-4 mt-14">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md p-6 mb-4 text-white">
        <h2 className="text-xl font-bold mb-2">Total Balance</h2>
        <p className="text-2xl">Rs. {balance}</p>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-md p-6 mb-4 text-white">
        <h2 className="text-xl font-bold mb-2">Total Investment</h2>
        <p className="text-2xl">Rs. {totalInvestment}</p>
      </div>

      <div className="bg-gradient-to-r from-red-400 to-pink-500 rounded-lg shadow-md p-6 mb-4 text-white">
        <h2 className="text-xl font-bold mb-2">Total Income</h2>
        <p className="text-2xl">Rs. {totalIncome}</p>
      </div>

      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg shadow-md p-6 mb-4 text-white">
        <h2 className="text-xl font-bold mb-2">Today's Income</h2>
        <p className="text-2xl">Rs. {todaysIncome}</p>
      </div>

      {/* Replace the old investment history section with the InvestmentSummary component */}
      <InvestmentSummary />

     
      </div>
   
  );
};

export default Profit;
