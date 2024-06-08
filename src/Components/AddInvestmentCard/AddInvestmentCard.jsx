import React, { useState } from 'react';
import axios from 'axios';
import Popup from '../AlertPage/Popup'; 

const AddInvestmentCard = () => {
  const [formData, setFormData] = useState({
    planName: '',
    price: '',
    dailyProfit: '',
    totalRevenue: '',
    days: '',
    type: 'disable',
  });

  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/api/invest/postinvest', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        setPopup({
          show: true,
          message: response.data.message,
          type: 'success',
        });
      } else {
        setPopup({
          show: true,
          message: 'Failed to add investment data.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setPopup({
        show: true,
        message: 'An error occurred. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Investment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Plan Name:</label>
          <input
            type="text"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Please enter the plan name"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold">Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Please enter the price"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Daily Profit:</label>
            <input
              type="text"
              name="dailyProfit"
              value={formData.dailyProfit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Please enter daily profit"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold">Total Revenue:</label>
            <input
              type="text"
              name="totalRevenue"
              value={formData.totalRevenue}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Please enter total revenue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Days:</label>
            <input
              type="text"
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Please enter days"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="disable">Disable</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default AddInvestmentCard;
