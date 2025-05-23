import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // New state to track loading

  return (
    <UserContext.Provider
      value={{ user, setUser, loadingUser, setLoadingUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
