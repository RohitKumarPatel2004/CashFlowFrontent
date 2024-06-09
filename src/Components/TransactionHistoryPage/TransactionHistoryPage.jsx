import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { getAuthDetails } = useAuth();

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const { email } = getAuthDetails();
      try {
        const response = await axios.post(`${baseURL}/transaction/handleTransactionHistory`, { email });
        if (response.data.success) {
          setTransactions(response.data.transactions);
          setSuccess('Transaction history fetched successfully');
        } else {
          setError('Failed to fetch transaction history');
        }
      } catch (error) {
        setError('An error occurred while fetching transaction history');
        const failedTransaction = { type: 'N/A', time: new Date().toISOString(), amount: 0, status: 'failed' };
        setTransactions([failedTransaction]);
      }
    };

    fetchTransactionHistory();
  }, [getAuthDetails]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Transaction History</h2>
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        
        <table className="w-full bg-white rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{transaction.type}</td>
                  <td className="py-2 px-4">{new Date(transaction.time).toLocaleString()}</td>
                  <td className="py-2 px-4">₹{parseFloat(transaction.amount).toFixed(2)}</td>
                  <td className={`py-2 px-4 ${transaction.status === 'success' ? 'text-green-600' : transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {transaction.status === 'success' ? 'Success' : transaction.status === 'pending' ? 'Pending' : 'Failed'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
