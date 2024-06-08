import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../Pages/BaseUrl/baseURL';
import InvestmentCardAdmin from './InvestmentCardAdmin';

function InvestmentCardApiAdmin() {
  const [investmentPlans, setInvestmentPlans] = useState([]);

  useEffect(() => {
    const fetchInvestmentPlans = async () => {
      try {
        const response = await axios.get(`${baseURL}/invest/getinvest`);
        console.log(response.data ,"ram");

        if (response.data.success) {
          setInvestmentPlans(response.data.data);
        } else {
          console.error('Failed to fetch investment plans');
        }
      } catch (error) {
        console.error('Error fetching investment plans:', error);
      }
    };

    fetchInvestmentPlans();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 w-full">
      <div className="w-11/12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {investmentPlans.map((plan) => (
          <InvestmentCardAdmin
            key={plan.id}
            id={plan.id}
            planName={plan.planName}
            price={plan.price}
            dailyProfit={plan.dailyProfit}
            totalRevenue={plan.totalRevenue}
            days={plan.days}
            type={plan.type}
          />
        ))}
      </div>
    </div>
  );
}

export default InvestmentCardApiAdmin;
