import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiUser, FiHome, FiInfo, FiBriefcase, FiDollarSign, FiDownload, FiLogOut, FiX, FiLogIn, FiPhone } from "react-icons/fi";
import profile from "../../Assets/HeaderImages/banner.png"; 
import { useAuth } from '../Context/Context';

const SideBar = ({ isOpen, handleClick, isAuthenticated, handleLogout, handleDeposit,handleTransactionHistory,handleInvestmentSummary, handleWithdraw, user }) => {
  const {logout}=useAuth()

  return (
    <div className={`fixed inset-0 w-[70%] z-40 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden bg-white shadow-lg`}>
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <button onClick={handleClick} className="text-black focus:outline-none mb-6">
            <FiX className="h-6 w-6" />
          </button>
          {isAuthenticated ? (
            <div className="flex items-center mb-6">
              <img src={user.profilePicture || profile} alt="User" className="w-8 h-8 rounded-full mr-2" />
              <div>
                <Link to="/mine" onClick={handleClick} className="text-sm font-semibold">Edit profile</Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>     
              <div>
                <Link to="/signIn" onClick={handleClick} className="text-sm font-semibold">Build your Profile</Link>
              </div>
            </div>
          )}
          <nav>
            <ul>
              <li className="mb-4">
                <NavLink exact to="/" onClick={handleClick} className=" py-2 flex items-center text-gray-700 hover:text-blue-700">
                  <FiHome className="mr-2" /> Home
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink to="/aboutUs" onClick={handleClick} className=" py-2 flex items-center text-gray-700 hover:text-blue-700">
                  <FiInfo className="mr-2" /> About
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink to="/guide" onClick={handleClick} className=" py-2 flex items-center text-gray-700 hover:text-blue-700">
                  <FiBriefcase className="mr-2" /> Guide
                </NavLink>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="mb-4">
                    <button onClick={() => { handleDeposit(); handleClick(); }} className=" py-2 flex items-center text-gray-700 hover:text-blue-700 w-full text-left">
                      <FiDownload className="mr-2" /> Deposit
                    </button>
                  </li>
                  <li className="mb-4">
                    <button onClick={() => { handleWithdraw(); handleClick(); }} className=" py-2 flex items-center text-gray-700 hover:text-blue-700 w-full text-left">
                      <FiDollarSign className="mr-2" /> Withdraw
                    </button>
                  </li>
                  <li className="mb-4">
                    <button onClick={() => {handleTransactionHistory(); handleClick(); }} className=" py-2 flex items-center text-gray-700 hover:text-blue-700 w-full text-left">
                      <FiDollarSign className="mr-2" /> Transaction History
                    </button>
                  </li>
                  <li className="mb-4">
                    <button onClick={() => {  handleInvestmentSummary(); handleClick(); }} className=" py-2 flex items-center text-gray-700 hover:text-blue-700 w-full text-left">
                      <FiDollarSign className="mr-2" /> handleInvestment Summary
                    </button>
                  </li>
                  <li className="mb-4">
                    <NavLink to="/customerSupport" onClick={handleClick} className=" py-2 flex items-center text-gray-700 hover:text-blue-700">
                      <FiPhone className="mr-2" /> Customer Support
                    </NavLink>
                  </li>
                  <li className="mb-4">
                    <button onClick={() => { handleLogout(); handleClick(); logout() }} className=" py-2 flex items-center text-red-600 hover:text-blue-700 w-full text-left">
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-4">
                    <Link to="/signIn" onClick={handleClick} className=" py-2 flex items-center text-gray-700 hover:text-blue-700">
                      <FiLogIn className="mr-2" /> Sign in
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link to="/signUp" onClick={handleClick} className=" py-2 flex items-center text-gray-700 hover:text-blue-700">
                      <FiUser className="mr-2" /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className="text-center text-gray-400">
          <p>Version 20.06</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
