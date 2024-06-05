import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Context';

function ReferralPage() {
  const { getAuthDetails } = useAuth();
  const { referral, no_of_referral } = getAuthDetails();
  
  const [referralLink, setReferralLink] = useState('');
  const [referralBonuses, setReferralBonuses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    // Generate referral link
    const link = `${window.location.origin}/signup?referralCode=${referral}`;
    setReferralLink(link);

    // Fetch referral bonuses from the backend (mock function for now)
    fetchReferralBonuses();
  }, [referral, no_of_referral]);

  const fetchReferralBonuses = () => {
    // Mock data for referral bonuses
    const bonuses = [
      { id: 1, description: 'Invite 2 people to invest and buy a non-free device, you will get a bonus of Rs.50.', requiredReferrals: 2, reward: 50 },
      { id: 2, description: 'Invite 4 people to invest and buy a non-free device, you will get a bonus of Rs.150.', requiredReferrals: 4, reward: 150 },
      { id: 3, description: 'Invite 10 people to invest and buy a non-free device, you will get a bonus of Rs.250.', requiredReferrals: 10, reward: 250 },
      { id: 4, description: 'Invite 15 people to invest and buy a non-free device, you will get a bonus of Rs.350.', requiredReferrals: 15, reward: 350 },
      { id: 5, description: 'Invite 20 people to invest and buy a non-free device, you will get a bonus of Rs.450.', requiredReferrals: 20, reward: 450 },
      { id: 6, description: 'Invite 21 people to invest and buy a non-free device, you will get a bonus of Rs.550.', requiredReferrals: 21, reward: 550 },
      { id: 7, description: 'Invite 22 people to invest and buy a non-free device, you will get a bonus of Rs.650.', requiredReferrals: 22, reward: 650 },
      { id: 8, description: 'Invite 23 people to invest and buy a non-free device, you will get a bonus of Rs.750.', requiredReferrals: 23, reward: 750 },
    ];

    let income = 0;
    const updatedBonuses = bonuses.map((bonus) => {
      if (no_of_referral >= bonus.requiredReferrals) {
        income += bonus.reward;
        return { ...bonus, received: true };
      } else {
        return { ...bonus, received: false };
      }
    });

    setReferralBonuses(updatedBonuses);
    setTotalIncome(income);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6">
        <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div>Team <span className="font-bold">{no_of_referral}</span></div>
          <div>Team total income <span className="font-bold">Rs. {totalIncome.toFixed(2)}</span></div>
        </div>
        <div className="bg-gray-200 p-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full">
            <div className="mb-2 md:mb-0 w-full">
              <input
                type="text"
                value={referral}
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
            <button 
              onClick={copyToClipboard}
              className="ml-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-t-lg mt-4">Invite Purchase Rewards</div>
        <div className="space-y-4">
          {referralBonuses.map((bonus) => {
            const progress = Math.min((no_of_referral / bonus.requiredReferrals) * 100, 100);

            return (
              <div key={bonus.id} className={`bg-white shadow-md p-4 rounded ${bonus.received ? 'opacity-50' : ''}`}>
                <div className="flex justify-between items-center">
                  <div>{bonus.description}</div>
                  <div className="flex items-center">
                    <div className={`mr-2 ${bonus.received ? 'text-green-500' : 'text-red-500'}`}>
                      {bonus.received ? 'Received' : 'Pending'}
                    </div>
                    <div>{bonus.received ? bonus.requiredReferrals : no_of_referral}/{bonus.requiredReferrals}</div>
                  </div>
                </div>
                <div className="relative w-full h-4 bg-gray-200 rounded mt-2">
                  <div
                    className={`absolute top-0 left-0 h-full rounded ${bonus.received ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReferralPage;
