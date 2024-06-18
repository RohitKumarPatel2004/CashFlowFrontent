import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../Pages/BaseUrl/baseURL';

const SuperAdminWithdrawalApprovalPage = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(`${baseURL}/adminApproveWithrawal/pendingWithdrawals`);
        if (response.data.success) {
          setWithdrawals(response.data.withdrawals);
        } else {
          setError('Failed to fetch withdrawal requests');
        }
      } catch (error) {
        setError('An error occurred while fetching withdrawal requests');
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleApproval = async (transactionId, action) => {
    try {
      const endpoint = action === 'approve' ? '/adminApproveWithrawal/approveWithdrawal' : '/adminApproveWithrawal/rejectWithdrawal';
      const response = await axios.post(`${baseURL}${endpoint}`, { transactionId });
      if (response.data.success) {
        setWithdrawals(withdrawals.filter(withdrawal => withdrawal.transaction_id !== transactionId));
        setSuccess(`Withdrawal ${action}d successfully`);
      } else {
        setError(`Failed to ${action} withdrawal`);
      }
    } catch (error) {
      setError(`An error occurred while trying to ${action} withdrawal`);
    }
  };

  const handleBulkApproval = async (action) => {
    setLoading(true);
    setError('');
    setSuccess('');
    let allSuccess = true;
    let errorCount = 0;

    for (const withdrawal of withdrawals) {
      try {
        const response = await axios.post(`${baseURL}/adminApproveWithrawal/${action === 'approve' ? 'approveWithdrawal' : 'rejectWithdrawal'}`, { transactionId: withdrawal.transaction_id });
        if (!response.data.success) {
          allSuccess = false;
          errorCount += 1;
        }
      } catch (error) {
        allSuccess = false;
        errorCount += 1;
      }
    }

    if (allSuccess) {
      setWithdrawals([]);
      setSuccess(`All withdrawals ${action}d successfully`);
    } else {
      setError(`Failed to ${action} ${errorCount} withdrawals`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Withdrawal Approval</h2>
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleBulkApproval('approve')}
              >
                Approve All
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleBulkApproval('reject')}
              >
                Reject All
              </button>
            </div>
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
                          onClick={() => handleApproval(withdrawal.transaction_id, 'approve')}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleApproval(withdrawal.transaction_id, 'reject')}
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
          </>
        )}
      </div>
    </div>
  );
};

export default SuperAdminWithdrawalApprovalPage;
