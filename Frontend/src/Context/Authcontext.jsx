
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://task-tracker-backend-8b5a.onrender.com/api/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "https://task-tracker-backend-8b5a.onrender.com/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
    } finally {
      localStorage.removeItem("token"); 
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <userContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthProvider;
