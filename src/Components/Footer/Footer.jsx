import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBalanceScale, FaGift, FaShareSquare, FaUser } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-around">
        <NavLink to="/" className="text-center" activeClassName="text-blue-400">
          <FaHome className="mx-auto w-5 h-4 mb-1" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/profit" className="text-center" activeClassName="text-blue-400">
          <FaBalanceScale className="mx-auto w-5 h-4 mb-1" />
          <span>Profit</span>
        </NavLink>
        <NavLink to="/share" className="text-center" activeClassName="text-blue-400">
          <FaShareSquare className="mx-auto w-5 h-4 mb-1" />
          <span>Share</span>
        </NavLink>
        <NavLink to="/mine" className="text-center" activeClassName="text-blue-400">
          <FaUser className="mx-auto w-5 h-4 mb-1" />
          <span>Mine</span>
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
