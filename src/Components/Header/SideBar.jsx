
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FiUser,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiDollarSign,
  FiDownload,
  FiLogOut,
  FiX,
  FiLogIn,
  FiPhone
} from 'react-icons/fi';
import profile from '../../Assets/HeaderImages/banner.png'; 
import { useAuth } from '../Context/Context';

const SideBar = ({
  isOpen,
  handleClick,
  isAuthenticated,
  handleLogout,
  handleDeposit,
  handleTransactionHistory,
  handleDashboard,
  handleWithdraw,
  user
}) => {
  const { logout } = useAuth();

  return (
    <div className={`fixed inset-0 w-[70%] z-40 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden bg-white shadow-lg`}>
      <div className="p-4 h-full flex flex-col justify-between">
        <div>
          <button onClick={handleClick} className="text-black focus:outline-none mb-4">
            <FiX className="h-6 w-6" />
          </button>
          {isAuthenticated ? (
            <div className="flex items-center mb-4">
              <img src={user.profilePicture || profile} alt="User" className="w-8 h-8 rounded-full mr-2" />
              <div>
                <Link to="/mine" onClick={handleClick} className="text-xs font-semibold">Edit profile</Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>     
              <div>
                <Link to="/signIn" onClick={handleClick} className="text-xs font-semibold">Build your Profile</Link>
              </div>
            </div>
          )}
          <nav>
            <ul>
              <li className="mb-3">
                <NavLink exact to="/" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                  <FiHome className="mr-2" /> Home
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink to="/aboutUs" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                  <FiInfo className="mr-2" /> About
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink to="/guide" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                  <FiBriefcase className="mr-2" /> Guide
                </NavLink>
              </li>
              {isAuthenticated && (
                <>
                  <li className="mb-3">
                    <button onClick={() => { handleDeposit(); handleClick(); }} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs w-full text-left">
                      <FiDownload className="mr-2" /> Deposit
                    </button>
                  </li>
                  <li className="mb-3">
                    <button onClick={() => { handleWithdraw(); handleClick(); }} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs w-full text-left">
                      <FiDollarSign className="mr-2" /> Withdraw
                    </button>
                  </li>
                  <li className="mb-3">
                    <button onClick={() => { handleDashboard(); handleClick(); }} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs w-full text-left">
                      <FiDollarSign className="mr-2" /> Dashboard
                    </button>
                    <ul className="pl-6 mt-1">
                      <li className="mb-2">
                        <NavLink to="/investmentCardAdmin" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                          Investment Card Admin
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink to="/addInvestmentCard" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                          Add Investment Card
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink to="/withdrawApprovel" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                           Admin Withdraw Approval
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink to="/adminWithdrawApprovel" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                         Super a Withdraw Approval
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="mb-3">
                    <button onClick={() => { handleTransactionHistory(); handleClick(); }} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs w-full text-left">
                      <FiDollarSign className="mr-2" /> Transaction History
                    </button>
                  </li>
                  <li className="mb-3">
                    <NavLink to="/customerSupport" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                      <FiPhone className="mr-2" /> Customer Support
                    </NavLink>
                  </li>
                  <li className="mb-3">
                    <button onClick={() => { handleLogout(); handleClick(); logout() }} className="py-1 flex items-center text-red-600 hover:text-blue-700 text-xs w-full text-left">
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <li className="mb-3">
                    <Link to="/signIn" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                      <FiLogIn className="mr-2" /> Sign in
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to="/signUp" onClick={handleClick} className="py-1 flex items-center text-gray-700 hover:text-blue-700 text-xs">
                      <FiUser className="mr-2" /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className="text-center text-gray-400 text-xs">
          <p>Version 20.06</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
