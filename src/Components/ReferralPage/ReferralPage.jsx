import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Context';

function ReferralPage() {
  const [referral, setReferral] = useState('');
  const [noOfReferral, setNoOfReferral] = useState(0);
  const [balance, setBalance] = useState(0);
  const [referralBalance, setReferralBalance] = useState(0);  
  const [referralLink, setReferralLink] = useState('');
  const [referralBonuses, setReferralBonuses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const { getAuthDetails } = useAuth();
  const { email } = getAuthDetails();

  useEffect(() => {
    fetchReferralDetails();
  }, []);

  useEffect(() => {
    if (referral) {
      const link = `${window.location.origin}/signup?referralCode=${referral}`;
      setReferralLink(link);
    }
  }, [referral]);

  const fetchReferralDetails = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/referral/handleReferral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (data.success) {
        setReferral(data.referral);
        setNoOfReferral(data.no_of_referral);
        setBalance(data.newBalance);
        setReferralBalance(data.newReferralBalance);  

        fetchReferralBonuses(data.no_of_referral);
      } else {
        console.error('Failed to fetch referral details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching referral details:', error);
    }
  };

  const fetchReferralBonuses = (noOfReferral) => {
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
      if (noOfReferral >= bonus.requiredReferrals) {
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
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-start py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <div className="bg-blue-700 text-white p-6 rounded-t-lg flex justify-between items-center">
          <div>Team Members: <span className="font-bold">{noOfReferral}</span></div>
          <div>Total Income: <span className="font-bold">Rs. {totalIncome.toFixed(2)}</span></div>
        </div>
        <div className="bg-gray-100 p-6 flex flex-col md:flex-row justify-between items-center rounded-b-lg">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full mb-4">
            <div className="w-full mb-2 md:mb-0">
              <input
                type="text"
                value={referral}
                readOnly
                placeholder="Invitation Code"
                className="w-full p-3 rounded border border-gray-300"
              />
            </div>
            <div className="w-full mb-2 md:mb-0">
              <input
                type="text"
                value={referralLink}
                readOnly
                placeholder="Invite Link"
                className="w-full p-3 rounded border border-gray-300"
              />
            </div>
            <button 
              onClick={copyToClipboard}
              className="ml-0 md:ml-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="bg-blue-600 text-white p-4 mt-4 rounded-lg text-center">Invite Purchase Rewards</div>
        <div className="space-y-4 mt-4">
          {referralBonuses.map((bonus) => {
            const progress = Math.min((noOfReferral / bonus.requiredReferrals) * 100, 100);

            return (
              <div key={bonus.id} className={`bg-white shadow-md p-6 rounded-lg ${bonus.received ? 'opacity-50' : ''}`}>
                <div className="flex justify-between items-center">
                  <div className="text-gray-700">{bonus.description}</div>
                  <div className="flex items-center">
                    <div className={`mr-2 ${bonus.received ? 'text-green-500' : 'text-red-500'}`}>
                      {bonus.received ? 'Received' : 'Pending'}
                    </div>
                    <div>{bonus.received ? bonus.requiredReferrals : noOfReferral}/{bonus.requiredReferrals}</div>
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
