import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { MdLogout, MdPassword, MdAccountBalanceWallet } from 'react-icons/md';
import profile from "../../Assets/HeaderImages/banner.png";
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';

const UserProfile = () => {
  const {getAuthDetails}=useAuth()
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
 const {logout}=useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {email}=getAuthDetails()
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
              profilePicture: userData.profilePicture.data.length ? `data:image/jpeg;base64,${Buffer.from(userData.profilePicture.data).toString('base64')}` : profile,
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
      const response = await axios.post('http://localhost:8001/api/profile/updatelocation', {
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
        const response = await axios.post('#', formData, {
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
    logout()
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
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6 flex flex-col items-center">
        <div className="relative">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-indigo-600"
          />
          <button
            onClick={() => setIsEditingProfilePicture(!isEditingProfilePicture)}
            className="absolute bottom-0 right-0 mb-2 mr-2 text-2xl text-gray-700"
          >
            <FaEdit />
          </button>
          {isEditingProfilePicture && (
            <div className="mt-2 flex flex-col items-center">
              <input type="file" onChange={handleProfilePictureChange} className="border rounded p-2" />
              <button onClick={handleProfilePictureUpdate} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                Update Profile Picture
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaUser className="mr-2" /> {user.full_name}
          </h2>
          <p className="text-gray-600 flex items-center">
            <FaEnvelope className="mr-2" /> {user.email}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaPhone className="mr-2" /> {user.number}
          </p>
          <div className="flex items-center mt-2">
            {isEditingLocation ? (
              <input
                type="text"
                placeholder="Update Location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="border rounded p-2"
              />
            ) : (
              <p className="text-gray-600 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {user.location}
              </p>
            )}
            <button onClick={() => setIsEditingLocation(!isEditingLocation)} className="ml-2 text-gray-500">
              <FaEdit />
            </button>
          </div>
          {isEditingLocation && (
            <button onClick={handleLocationUpdate} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update Location
            </button>
          )}
        </div>
        <div className="mt-4">
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
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdrawRedirect}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Withdraw
          </button>
        </div>
        <div className="mt-6 flex flex-col md:flex-row md:space-x-6">
          <button onClick={handleChangePassword} className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 flex items-center">
            <MdPassword className="mr-2" /> Change Password
          </button>
          <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center">
            <MdLogout className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
