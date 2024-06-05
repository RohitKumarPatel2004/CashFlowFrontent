import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRupeeSign, FaEdit } from 'react-icons/fa';
import { MdLogout, MdPassword, MdAccountBalanceWallet } from 'react-icons/md';
import profile from "../../Assets/HeaderImages/banner.png";
import { useAuth } from '../Context/Context';
import baseURL from '../../Pages/BaseUrl/baseURL';
import Buffer from 'buffer';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
                ? `data:image/jpeg;base64,${Buffer.Buffer.from(userData.profilePicture.data).toString('base64')}`
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
  }, [getAuthDetails]);

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
        setIsErrorPopupOpen(true);
        setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
      }
    } catch (error) {
      setError('An error occurred while updating the location');
      setIsErrorPopupOpen(true);
      setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
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
          setIsErrorPopupOpen(true);
          setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
        }
      } catch (error) {
        setError('An error occurred while updating the profile picture');
        setIsErrorPopupOpen(true);
        setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
      }
    } else {
      setError('Please select a profile picture to upload');
      setIsErrorPopupOpen(true);
      setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
    }
  };

  const handleDepositRedirect = () => {
    navigate('/deposit');
  };

  const handleWithdrawRedirect = () => {
    navigate('/withdraw');
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setIsErrorPopupOpen(true);
      setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/changePassword/handleUpdatePassword`, {
        email: user.email,
        currentPassword,
        newPassword,
      });
      if (response.data.success) {
        setSuccessMessage('Password updated successfully');
        setIsSuccessPopupOpen(true);
        setTimeout(() => {
          setIsSuccessPopupOpen(false);
          setIsModalOpen(false);
        }, 3000); // Hide success popup and close modal after 3 seconds
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError(''); // Clear any previous error message
      } else {
        setError(response.data.message);
        setIsErrorPopupOpen(true);
        setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
      }
    } catch (error) {
      console.error('Error:', error.response.data.message);
      setError(error.response.data.message || 'An error occurred while changing the password');
      setIsErrorPopupOpen(true);
      setTimeout(() => setIsErrorPopupOpen(false), 3000); // Hide error popup after 3 seconds
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleChangePassword();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
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
            {isEditingLocation && (
              <button onClick={handleLocationUpdate} className="ml-2 text-green-500">
                Save
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
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-full transition duration-300 flex items-center"
          >
            <MdPassword className="mr-2" /> Change Password
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-full transition duration-300 flex justify-center items-center"
          >
            <MdLogout className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
              <div className="flex justify-end">
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                  Back
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isErrorPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        </div>
      )}

      {isSuccessPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Success</h2>
            <p className="text-green-500 mb-4">{successMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
