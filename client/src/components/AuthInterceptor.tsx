import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import api from "../services/api";

const AuthInterceptor: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return <>{children}</>;
};

export default AuthInterceptor;
