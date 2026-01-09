import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/verify",
          {
            withCredentials: true, 
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
            console.log(response.data.error)
          setUser(null);
        }
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
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
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
    } finally {
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
