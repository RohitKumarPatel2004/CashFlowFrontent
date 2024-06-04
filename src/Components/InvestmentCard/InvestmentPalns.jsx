import React from 'react';
import InvestmentCard from './InvestmentCard';

function InvestmentPalns() {
  const investmentPlans = [
    { planName: "Free", price: 0, dailyProfit: 24, totalRevenue: 8760, days: 365 },
    { planName: "Free plan", price: 0, dailyProfit: 24, totalRevenue: 8760, days: 365 }
  ];

  return (
  
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <div className="container mx-auto p-4">
          
         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {investmentPlans.map((plan, index) => (
                  <InvestmentCard
                    key={index}
                    planName={plan.planName}
                    price={plan.price}
                    dailyProfit={plan.dailyProfit}
                    totalRevenue={plan.totalRevenue}
                    days={plan.days}
                  />
                ))}
              </div>
              </div>
              </div>
           
         
       
       
   
  );
}

export default InvestmentPalns;
