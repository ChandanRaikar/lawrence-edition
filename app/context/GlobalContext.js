"use client";
import { createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "../actions/getUnreadMessageCount";
import { useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) {
          setUnreadMessages(res.count);
        }
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadMessages, setUnreadMessages }}>
      {" "}
      {children}{" "}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};
