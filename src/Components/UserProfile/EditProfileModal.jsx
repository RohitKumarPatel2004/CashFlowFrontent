import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../Pages/BaseUrl/baseURL';
import Popup from '../AlertPage/Popup'; // Import Popup component

const EditProfileModal = ({ user, onClose, onUpdate }) => {
  const [fullName, setFullName] = useState(user.full_name);
  const [location, setLocation] = useState(user.location);
  const [profilePicture, setProfilePicture] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' }); // State for popup

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('full_name', fullName);
      formData.append('location', location);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      const response = await axios.post(`${baseURL}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setPopup({ show: true, message: 'Profile updated successfully!', type: 'success' }); // Show success popup
        onUpdate();
        onClose();
      } else {
        setPopup({ show: true, message: response.data.message || 'Failed to update profile', type: 'error' }); // Show error popup
      }
    } catch (error) {
      console.error('Error:', error);
      setPopup({ show: true, message: 'An error occurred while updating the profile', type: 'error' }); // Show error popup
    }
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: '', type: '' }); // Close popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={handleProfilePictureChange}
              className="w-full p-2 border rounded"
            />
            {profilePicture && (
              <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="mt-2 w-24 h-24 rounded-full" />
            )}
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
      {popup.show && ( // Render popup if show is true
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default EditProfileModal;
