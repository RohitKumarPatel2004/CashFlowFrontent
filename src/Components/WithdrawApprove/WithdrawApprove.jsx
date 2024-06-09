import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../Pages/BaseUrl/baseURL';

const AdminWithdrawalApprovalPage = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(`${baseURL}/approveWithrawal/pendingWithdrawals`);
        if (response.data.success) {
          setWithdrawals(response.data.withdrawals);
        } else {
          setError('Failed to fetch withdrawal requests');
        }
      } catch (error) {
        setError('An error occurred while fetching withdrawal requests');
      }
    };

    fetchWithdrawals();
  }, []);

  const handleApproval = async (transactionId, action) => {
    try {
      const endpoint = action === 'approve' ? '/approveWithrawal/approveWithdrawal' : '/approveWithrawal/rejectWithdrawal';
      const response = await axios.post(`${baseURL}${endpoint}`, { transactionId });
      if (response.data.success) {
        setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== transactionId));
        setSuccess(`Withdrawal ${action}d successfully`);
      } else {
        setError(`Failed to ${action} withdrawal`);
      }
    } catch (error) {
      setError(`An error occurred while trying to ${action} withdrawal`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Withdrawal Approval</h2>
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        
        <table className="w-full bg-white rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length > 0 ? (
              withdrawals.map((withdrawal, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{withdrawal.email}</td>
                  <td className="py-2 px-4">₹{parseFloat(withdrawal.amount).toFixed(2)}</td>
                  <td className="py-2 px-4">{new Date(withdrawal.time).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleApproval(withdrawal.id, 'approve')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleApproval(withdrawal.id, 'reject')}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No pending withdrawals found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWithdrawalApprovalPage;
