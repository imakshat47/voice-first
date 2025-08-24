import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("bolsaathi_token"));

  useEffect(() => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            // Check if the token is expired
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            } else {
                setUser({ name: decodedToken.sub }); // 'sub' from your backend
            }
        } catch (error) {
            console.error("Invalid token:", error);
            logout(); // Clear bad token
        }
    }
  }, [token]);

  const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/token', new URLSearchParams({
            username: username,
            password: password,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
      
        const { access_token } = response.data;
        localStorage.setItem("bolsaathi_token", access_token);
        setToken(access_token);

        // Axios interceptor will handle setting the header for future requests
    } catch (error) {
        console.error("Login failed:", error);
        // Rethrow the error so the login page can display a message
        throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    localStorage.removeItem("bolsaathi_token");
    setToken(null);
    setUser(null);
  };

  const value = { user, token, isAuthenticated: !!token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};