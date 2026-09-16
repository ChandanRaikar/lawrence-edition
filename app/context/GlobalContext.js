"use client";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const value = { unreadMessages, setUnreadMessages };
  return (
    <GlobalContext.Provider value={value}> {children} </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  }
  return context;
};
