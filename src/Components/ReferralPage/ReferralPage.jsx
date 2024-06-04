import React, { useState, useEffect } from 'react';

const ReferralPage = () => {
  const [user, setUser] = useState({ id: 1, name: 'John Doe' }); // Example user data
  const [referralLink, setReferralLink] = useState('');
  const [referralBonuses, setReferralBonuses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    // Generate referral link
    const link = `${window.location.origin}/referral/${user.id}`;
    setReferralLink(link);

    // Fetch referral bonuses from the backend (this is a mock function)
    fetchReferralBonuses(user.id);
  }, [user]);

  const fetchReferralBonuses = (userId) => {
    // This function should fetch referral bonuses from the backend
    // Mock data
    const bonuses = [
      { id: 1, description: 'Invite 1 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: true },
      { id: 2, description: 'Invite 2 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: false },
      { id: 3, description: 'Invite 3 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: false },
      { id: 4, description: 'Invite 4 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: false },
      { id: 5, description: 'Invite 5 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: false },
      { id: 6, description: 'Invite 6 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: false },
      { id: 7, description: 'Invite 7 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: false },
      { id: 8, description: 'Invite 8 person to invest and buy a non-free device, you will get a bonus of Rs.50.', received: false }

    ];
    setReferralBonuses(bonuses);
    setTotalIncome(50); // Example total income
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
        <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div>Team <span className="font-bold">1</span></div>
          <div>Team total income <span className="font-bold">Rs. {totalIncome.toFixed(2)}</span></div>
        </div>
        <div className="bg-gray-200 p-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full">
            <div className="mb-2 md:mb-0 w-full">
              <input
                type="text"
                value={user.id}
                readOnly
                placeholder="Invitation code"
                className="w-full p-2 rounded border border-gray-400"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                value={referralLink}
                readOnly
                placeholder="Invite link"
                className="w-full p-2 rounded border border-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-t-lg mt-4">Invite Purchase Rewards</div>
        <div className="space-y-4">
          {referralBonuses.map((bonus) => (
            <div key={bonus.id} className="bg-white shadow-md p-4 rounded flex justify-between items-center">
              <div>{bonus.description}</div>
              <div className="flex items-center">
                <div className={`mr-2 ${bonus.received ? 'text-green-500' : 'text-red-500'}`}>
                  {bonus.received ? 'Received' : 'Pending'}
                </div>
                <div>{bonus.received ? '1/1' : '0/1'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
