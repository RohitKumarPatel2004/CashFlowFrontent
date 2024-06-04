import React, { createContext, useState } from 'react';

const InvestmentContext = createContext();

const InvestmentProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);

  const addInvestment = (investment) => {
    setInvestments([...investments, investment]);
  };

  return (
    <InvestmentContext.Provider value={{ investments, addInvestment }}>
      {children}
    </InvestmentContext.Provider>
  );
};

export { InvestmentContext, InvestmentProvider };
