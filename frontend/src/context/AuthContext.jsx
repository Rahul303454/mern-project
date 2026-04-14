import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({
    token: null,
    role: null,
    name: null,
    email: null
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setUser(JSON.parse(auth));
    }
  }, []);

  // Login function — store token and user info as stringified object
  const login = (data) => {
    // data = { token, role, name, email }
    localStorage.setItem("auth", JSON.stringify(data));
    setUser(data);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth");
    setUser({ token: null, role: null, name: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
