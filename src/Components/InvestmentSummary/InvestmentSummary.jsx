import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';

const InvestmentSummary = () => {
  const [investmentDetails, setInvestmentDetails] = useState([]);
  const [error, setError] = useState('');
  const { getAuthDetails } = useAuth();

  useEffect(() => {
    const fetchInvestmentDetails = async () => {
      const { email } = getAuthDetails(); // Call getAuthDetails to get user details
     
      try {
        const response = await axios.post(`${baseURL}/investment/handleGetInvestmentDetails`, { email });

        if (response.data.success) {
          setInvestmentDetails(response.data.userData);
        } else {
          setError('Failed to fetch investment details');
        }
      } catch (error) {
        setError('Error fetching investment details');
      }
    };

    fetchInvestmentDetails();
  }, [getAuthDetails]);

  return (
    <div className="min-h-screen mt-10 bg-gray-100 flex flex-col items-center p-4 w-full">
      <h1 className="text-2xl font-bold mb-6">Investment Details</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-11/12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {investmentDetails.map((investment, index) => (
          <div key={index} className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden my-4">
            <div className="bg-indigo-600 text-white p-4">
              <h2 className="text-center text-xl font-bold">{investment.planName}</h2>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="text-center">
                <p className="text-gray-600">Price: Rs. {investment.price}</p>
                <p className="text-gray-600">Daily Profit: Rs. {investment.dailyProfit}</p>
                <p className="text-gray-600">Total Revenue: Rs. {investment.totalRevenue}</p>
                <p className="text-gray-600">Number of days: {investment.days}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentSummary;
