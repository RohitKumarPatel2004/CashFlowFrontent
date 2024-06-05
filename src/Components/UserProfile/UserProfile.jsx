import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRupeeSign , FaEdit } from 'react-icons/fa';
import { MdLogout, MdPassword, MdAccountBalanceWallet } from 'react-icons/md';
import profile from "../../Assets/HeaderImages/banner.png";
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';

const UserProfile = () => {
  const { getAuthDetails, logout } = useAuth();
  const [user, setUser] = useState({
    full_name: '',
    email: '',
    number: '',
    location: '',
    profilePicture: profile,
    joinedDate: '',
    totalBalance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { email } = getAuthDetails();
      if (email) {
        try {
          const response = await axios.post(`${baseURL}/profile/getprofile`, { email });
          if (response.data.success) {
            const userData = response.data.userData;
            setUser({
              full_name: userData.full_name,
              email: userData.email,
              number: userData.number,
              location: userData.location,
              profilePicture: userData.profilePicture.data.length
                ? `data:image/jpeg;base64,${Buffer.from(userData.profilePicture.data).toString('base64')}`
                : profile,
              joinedDate: new Date(userData.joinedDate).toLocaleDateString(),
              totalBalance: userData.balance,
            });
          } else {
            setError('Failed to fetch user data');
          }
        } catch (error) {
          setError('An error occurred while fetching user data');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user email found in local storage');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLocationUpdate = async () => {
    try {
      const response = await axios.post(`${baseURL}/profile/updatelocation`, {
        email: user.email,
        newLocation,
      });
      if (response.data.success) {
        setUser((prevState) => ({ ...prevState, location: newLocation }));
        setNewLocation('');
        setIsEditingLocation(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred while updating the location');
    }
  };

  const handleProfilePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleProfilePictureUpdate = async () => {
    if (newProfilePicture) {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('profilePicture', newProfilePicture);

      try {
        const response = await axios.post(`${baseURL}/profile/updateprofilepicture`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.success) {
          setUser((prevState) => ({ ...prevState, profilePicture: URL.createObjectURL(newProfilePicture) }));
          setNewProfilePicture(null);
          setIsEditingProfilePicture(false);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('An error occurred while updating the profile picture');
      }
    } else {
      setError('Please select a profile picture to upload');
    }
  };

  const handleDepositRedirect = () => {
    navigate('/deposit');
  };

  const handleWithdrawRedirect = () => {
    navigate('/withdraw');
  };

  const handleChangePassword = () => {
    console.log('Change Password clicked');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 flex flex-col items-center">
        <div className="relative w-full flex justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-t-lg">
          <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.full_name}
          </h2>
          <p className="text-sm text-gray-600 flex items-center justify-center mt-2">
            <FaEnvelope className="mr-2" /> {user.email}
          </p>
          <p className="text-sm text-gray-600 flex items-center justify-center mt-2">
            <FaPhone className="mr-2" /> {user.number}
          </p>
          <div className="flex items-center justify-center mt-2">
            {isEditingLocation ? (
              <input
                type="text"
                placeholder="Update Location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="border rounded p-2"
              />
            ) : (
              <p className="text-sm text-gray-600 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {user.location}
              </p>
            )}
            <button onClick={() => setIsEditingLocation(!isEditingLocation)} className="ml-2 text-gray-500">
              <FaEdit />
            </button>
          </div>
          {isEditingLocation && (
            <button onClick={handleLocationUpdate} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Update Location
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-xl font-bold flex items-center">
            <MdAccountBalanceWallet className="mr-2" /> Total Balance
          </h3>
          <p className="text-2xl text-indigo-600 flex items-center">
            <FaRupeeSign className="mr-2" /> {user.totalBalance}
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleDepositRedirect}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full transition duration-300"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdrawRedirect}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-full transition duration-300"
          >
            Withdraw
          </button>
        </div>
        <div className="mt-6 flex flex-col md:flex-row md:space-x-6">
          <button onClick={handleChangePassword} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full transition duration-300 flex">
            <MdPassword className="mr-2" /> Change Password
          </button>
          <button onClick={handleLogout} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-full transition duration-300 flex justify-center items-center">
            <MdLogout className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
