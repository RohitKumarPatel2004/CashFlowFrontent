import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Popup = ({ message, type, onClose }) => {
  let icon;
  let titleColor;
  let titleText;

  switch (type) {
    case "success":
      icon = <FaCheckCircle className="text-green-500 mr-2" size={20} />;
      titleText = "Success";
      titleColor = "text-green-600";
      break;
    case "error":
      icon = <FaExclamationCircle className="text-red-500 mr-2" size={20} />;
      titleText = "Error";
      titleColor = "text-red-600";
      break;
    default:
      icon = null;
      titleText = "";
      titleColor = "";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105">
        <div className="flex items-center mb-3">
          {icon}
          <h2 className={`text-lg font-bold ${titleColor}`}>{titleText}</h2>
        </div>
        <p className="text-gray-700">{message}</p> 
      </div>
    </div>
  );
};

export default Popup;
