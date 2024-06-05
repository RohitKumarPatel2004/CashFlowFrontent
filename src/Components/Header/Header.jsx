import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../Assets/HeaderImages/logo.png";
import profile from "../../Assets/HeaderImages/banner.png"; // Assuming you have a default profile picture
import { FiMenu, FiX, FiUser, FiLogIn, FiLogOut, FiBriefcase, FiHome, FiInfo, FiDollarSign, FiDownload, FiPhone } from "react-icons/fi";
import SideBar from "./SideBar";
import { useAuth } from "../Context/Context";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const {logout}=useAuth()
  const user = useSelector((state) => state.user); 


  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout()
    navigate('/');
  };

  const handleTransactionHistory = () => {
    navigate("/transactionHistory");
  };

  
  
  const handleDeposit = () => {
    navigate("/deposit");
  };

  const handleWithdraw = () => {
    navigate("/withdraw");
  };

  return (
    <section className="top-0 py-4 bg-sky-50 fixed w-full z-30 shadow-md">
       <div className="container mx-auto flex justify-between items-center px-4">
        <div className="sm:hidden">
          <button onClick={handleClick} className="text-black focus:outline-none">
            {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto">
          <img src={logo} alt="Logo" className="h-8 ml-auto sm:ml-0" />
        </div>
        <nav className="hidden sm:flex space-x-8 font-bold">
          <NavLink exact to="/" activeClassName="text-blue-700" className="hover:text-blue-700 flex items-center">
            <FiHome className="mr-1" /> Home
          </NavLink>
          <NavLink to="/aboutUs" activeClassName="text-blue-700" className="hover:text-blue-700 flex items-center">
            <FiInfo className="mr-1" /> About
          </NavLink>
          <NavLink to="/guide" activeClassName="text-blue-700" className="hover:text-blue-700 flex items-center">
            <FiBriefcase className="mr-1" /> Guide
          </NavLink>
          <NavLink to="/dashboard" activeClassName="text-blue-700" className="hover:text-blue-700 flex items-center">
            <FiUser className="mr-1" /> Dashboard
          </NavLink>
        </nav>
        <div className="hidden sm:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <img
                src={user.profilePicture || profile}
                alt="User"
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link to="/mine" onClick={handleClick} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiUser className="mr-2" /> Profile
                  </Link>
                  <Link to="/profit" onClick={handleClick} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiDollarSign className="mr-2" /> Profit
                  </Link>
                  <button onClick={handleDeposit} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiDownload className="mr-2" /> Deposit
                  </button>
                  <button onClick={handleWithdraw} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiDownload className="mr-2" /> Withdraw
                  </button>
                  <button onClick={handleTransactionHistory} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiDollarSign className="mr-2" /> Transaction History
                  </button>
                  <Link to="/customerSupport" onClick={handleClick} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiPhone className="mr-2" /> Customer Support
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signIn" className="bg-blue-600 hover:bg-blue-800 text-white rounded-lg px-4 py-1">Sign in</Link>
              <Link to="/signUp" className="bg-blue-600 hover:bg-blue-800 text-white rounded-lg px-4 py-1">Register</Link>
            </>
          )}
        </div>
      </div>

      <SideBar
        isOpen={open}
        handleClick={handleClick}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        handleDeposit={handleDeposit}
        handleWithdraw={handleWithdraw}
        handleTransactionHistory={handleTransactionHistory}
        user={user}
      />
    </section>
  );
}
