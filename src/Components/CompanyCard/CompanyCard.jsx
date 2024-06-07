import React from 'react';
import bgImage from '../../Assets/HeaderImages/investment.jpeg'; // Update the path if needed

const CompanyCard = () => {
  return (
    <div className="w-[90%] mx-auto rounded overflow-hidden shadow-lg mt-20 transform transition duration-500 ">
      <div className="relative -mt-6 h-[250px] bg-white text-center rounded-b-lg shadow-lg overflow-hidden">
        <img src={bgImage} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover rounded-b-lg opacity-80 " />
        <div className="relative  px-6 py-24">
          <h2 className="font-bold text-white text-xl mb-2">Follow Us</h2>
          <p className="text-white font-medium text-base">
            Update the latest news in real time
          </p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            About Us...
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
