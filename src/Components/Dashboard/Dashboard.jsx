import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboarda = () => {
  const [dashboardData, setDashboardData] = useState({ totalUsers: 0, totalInvestors: 0, allUsersResult: [] });
  const [selectedUserInvestments, setSelectedUserInvestments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [joinedDateFrom, setJoinedDateFrom] = useState('');
  const [joinedDateTo, setJoinedDateTo] = useState('');
  const [balanceFrom, setBalanceFrom] = useState('');
  const [balanceTo, setBalanceTo] = useState('');
  const [totalInvestmentFrom, setTotalInvestmentFrom] = useState('');
  const [totalInvestmentTo, setTotalInvestmentTo] = useState('');
  const [totalProfitFrom, setTotalProfitFrom] = useState('');
  const [totalProfitTo, setTotalProfitTo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8001/api/adminDashboard/getAdminDashboardData')
      .then((response) => {
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInvestmentDetails = (email) => {
    axios.get(`http://localhost:8001/api/adminDashboard/getUserInvestmentDetails/${email}`)
      .then((response) => {
        if (response.data.success) {
          setSelectedUserInvestments(response.data.data);
          setSelectedUserId(email);
        }
      })
      .catch((error) => console.error('Error fetching investment details:', error));
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLocationFilter = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleJoinedDateFrom = (e) => {
    setJoinedDateFrom(e.target.value);
  };

  const handleJoinedDateTo = (e) => {
    setJoinedDateTo(e.target.value);
  };

  const handleBalanceFrom = (e) => {
    setBalanceFrom(e.target.value);
  };

  const handleBalanceTo = (e) => {
    setBalanceTo(e.target.value);
  };

  const handleTotalInvestmentFrom = (e) => {
    setTotalInvestmentFrom(e.target.value);
  };

  const handleTotalInvestmentTo = (e) => {
    setTotalInvestmentTo(e.target.value);
  };

  const handleTotalProfitFrom = (e) => {
    setTotalProfitFrom(e.target.value);
  };

  const handleTotalProfitTo = (e) => {
    setTotalProfitTo(e.target.value);
  };

  const filteredUsers = dashboardData.allUsersResult.filter(user => 
    (user.email.toLowerCase().includes(searchInput.toLowerCase()) || 
    user.number.includes(searchInput)) &&
    (locationFilter === '' || user.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
    (joinedDateFrom === '' || new Date(user.joinedDate) >= new Date(joinedDateFrom)) &&
    (joinedDateTo === '' || new Date(user.joinedDate) <= new Date(joinedDateTo)) &&
    (balanceFrom === '' || user.balance >= parseFloat(balanceFrom)) &&
    (balanceTo === '' || user.balance <= parseFloat(balanceTo)) &&
    (totalInvestmentFrom === '' || user.totalInvestment >= parseFloat(totalInvestmentFrom)) &&
    (totalInvestmentTo === '' || user.totalInvestment <= parseFloat(totalInvestmentTo)) &&
    (totalProfitFrom === '' || user.totalDailyProfit >= parseFloat(totalProfitFrom)) &&
    (totalProfitTo === '' || user.totalDailyProfit <= parseFloat(totalProfitTo))
  );

  return (
    <div className='flex justify-center items-center bg-gray-800 text-white min-h-screen'>
      <div className="p-8 bg-gray-700 w-[90%] mt-20 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-600 p-4 rounded-lg shadow">
            <h2 className="text-gray-300">Total Users</h2>
            <p className="text-2xl font-semibold">{dashboardData.totalUsers}</p>
          </div>
          <div className="bg-gray-600 p-4 rounded-lg shadow">
            <h2 className="text-gray-300">Total Investors</h2>
            <p className="text-2xl font-semibold">{dashboardData.totalInvestors}</p>
          </div>
          <div className="bg-gray-600 p-4 rounded-lg shadow">
            <h2 className="text-gray-300">New Applicants</h2>
            <p className="text-2xl font-semibold">123</p>
          </div>
          <div className="bg-gray-600 p-4 rounded-lg shadow">
            <h2 className="text-gray-300">Upcoming Company Event</h2>
            <p className="text-blue-400">Watch a trailer</p>
          </div>
        </div>

        {/* Search and Filter Options */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            placeholder="Search by email or number"
            className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={locationFilter}
            onChange={handleLocationFilter}
            placeholder="Filter by location"
            className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <input
              type="date"
              value={joinedDateFrom}
              onChange={handleJoinedDateFrom}
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={joinedDateTo}
              onChange={handleJoinedDateTo}
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={balanceFrom}
              onChange={handleBalanceFrom}
              placeholder="Balance from"
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={balanceTo}
              onChange={handleBalanceTo}
              placeholder="Balance to"
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={totalInvestmentFrom}
              onChange={handleTotalInvestmentFrom}
              placeholder="Investment from"
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={totalInvestmentTo}
              onChange={handleTotalInvestmentTo}
              placeholder="Investment to"
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={totalProfitFrom}
              onChange={handleTotalProfitFrom}
              placeholder="Profit from"
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={totalProfitTo}
              onChange={handleTotalProfitTo}
              placeholder="Profit to"
              className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* User Data Table */}
        <div className="bg-gray-600 p-4 rounded-lg shadow mb-6">
          <h2 className="text-gray-300 mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 text-sm text-white">
              <thead className="bg-gray-600 text-gray-300 uppercase text-xs leading-normal">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Full Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Balance</th>
                  <th className="py-3 px-4 text-left">Number</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Referral Code</th>
                  <th className="py-3 px-4 text-left">No. of Referrals</th>
                  <th className="py-3 px-4 text-left">Referral Balance</th>
                  <th className="py-3 px-4 text-left">Joined Date</th>
                  <th className="py-3 px-4 text-left">Total Investment</th>
                  <th className="py-3 px-4 text-left">Total Profit</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-xs font-light">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-600 hover:bg-gray-700">
                    <td className="py-2 px-4 text-left">{user.id}</td>
                    <td className="py-2 px-4 text-left">{user.full_name}</td>
                    <td className="py-2 px-4 text-left">{user.email}</td>
                    <td className="py-2 px-4 text-left">{user.balance}</td>
                    <td className="py-2 px-4 text-left">{user.number}</td>
                    <td className="py-2 px-4 text-left">{user.location}</td>
                    <td className="py-2 px-4 text-left">{user.referral_code}</td>
                    <td className="py-2 px-4 text-left">{user.no_of_referral}</td>
                    <td className="py-2 px-4 text-left">{user.referral_balance}</td>
                    <td className="py-2 px-4 text-left">{new Date(user.joinedDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-left">{user.totalInvestment}</td>
                    <td className="py-2 px-4 text-left">{user.totalDailyProfit}</td>
                    <td className="py-2 px-4 text-left">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        onClick={() => handleInvestmentDetails(user.email)}
                      >
                        Investment Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Details Modal */}
        {selectedUserId && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
              <h2 className="text-gray-300 mb-4">Investment Details for {selectedUserId}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-xs text-white">
                  <thead className="bg-gray-600 text-gray-300 uppercase text-xs leading-normal">
                    <tr>
                      <th className="py-2 px-4 text-left">Plan Name</th>
                      <th className="py-2 px-4 text-left">Price</th>
                      <th className="py-2 px-4 text-left">Daily Profit</th>
                      <th className="py-2 px-4 text-left">Total Revenue</th>
                      <th className="py-2 px-4 text-left">Days</th>
                      <th className="py-2 px-4 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-xs font-light">
                    {selectedUserInvestments.map((investment, index) => (
                      <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                        <td className="py-2 px-4 text-left">{investment.planName}</td>
                        <td className="py-2 px-4 text-left">{investment.price}</td>
                        <td className="py-2 px-4 text-left">{investment.dailyProfit}</td>
                        <td className="py-2 px-4 text-left">{investment.totalRevenue}</td>
                        <td className="py-2 px-4 text-left">{investment.days}</td>
                        <td className="py-2 px-4 text-left">{new Date(investment.time).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setSelectedUserId(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Dashboarda;
