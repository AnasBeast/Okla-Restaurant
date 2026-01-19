/**
 * Authentication Context
 * Provides global auth state management
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsLoading(false);
      setIsAuthenticated(false);
      return false;
    }

    try {
      const { data } = await authAPI.checkUser(token);
      setUser(data.data || data);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } catch (err) {
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login function
  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const { data } = await authAPI.login(email, password);
      const token = data.token || data.data?.token;

      if (token) {
        localStorage.setItem("accessToken", token);
        setUser(data.data || data);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true, data };
      }

      throw new Error("Token not received");
    } catch (err) {
      setIsLoading(false);
      const message = err.message || "Login failed";
      setError(message);
      return { success: false, error: message };
    }
  };

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      // Continue with logout even if API fails
      console.log("Logout API error:", err);
    }

    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Get current token
  const getToken = () => localStorage.getItem("accessToken");

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
