import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Popup = ({ message, type }) => {
  let icon;
  let iconColor;
  switch (type) {
    case "success":
      icon = <FaCheckCircle className="text-green-500" size={24} />;
      iconColor = "text-green-500";
      break;
    case "error":
      icon = <FaExclamationCircle className="text-red-500" size={24} />;
      iconColor = "text-red-500";
      break;
    default:
      icon = null;
      iconColor = "";
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg flex justify-center items-center">
        {icon}
        <p className={`ml-2 ${iconColor}`}>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
