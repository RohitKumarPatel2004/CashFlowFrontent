import React, { useContext, useState } from 'react';
import { InvestmentContext } from '../Store/InvestmentContext';

const Profit = () => {
  const { investments, balance, deposit, withdraw } = useContext(InvestmentContext);
  const [amount, setAmount] = useState('');

  const totalInvestment = investments.reduce((total, investment) => total + investment.amount, 0);
  const totalIncome = investments.reduce((total, investment) => total + (investment.dailyProfit * investment.days), 0);
  const today = new Date().toISOString().split('T')[0];
  const todaysIncome = investments.filter(investment => investment.date === today).reduce((total, investment) => total + investment.dailyProfit, 0);

  const handleDeposit = () => {
    deposit(Number(amount));
    setAmount('');
  };

  const handleWithdraw = () => {
    withdraw(Number(amount));
    setAmount('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Total Balance</h2>
        <p className="text-2xl">Rs. {balance}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Total Investment</h2>
        <p className="text-2xl">Rs. {totalInvestment}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Total Income</h2>
        <p className="text-2xl">Rs. {totalIncome}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Today's Income</h2>
        <p className="text-2xl">Rs. {todaysIncome}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Investment History</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {investments.map(investment => (
              <tr key={investment.id} className="text-center">
                <td className="py-2">{investment.date}</td>
                <td className="py-2">Rs. {investment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Manage Account</h2>
        <div className="mb-4">
          <input
            type="number"
            className="border rounded py-2 px-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <button onClick={handleDeposit} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Deposit</button>
        <button onClick={handleWithdraw} className="bg-red-500 text-white py-2 px-4 rounded">Withdraw</button>
      </div>
    </div>
  );
};

export default Profit;
