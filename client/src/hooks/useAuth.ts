import { useState, useCallback } from "react";
import api from '../services/api';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token: token  } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, []);

  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      try {
        const response = await api.post("/auth/register", {
          email,
          password,
          firstName,
          lastName,
        });
        const { access_token: token  } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  return { token, login, register, logout };
};
