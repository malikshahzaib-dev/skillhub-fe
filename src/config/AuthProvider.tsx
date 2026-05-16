import React, {  useContext, useEffect, useState } from "react";
import { AuthContext, type User } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserInState] = useState<User | null>(null);
  const [token, setTokenInState] = useState<string>("");
  const logOut = () => {
    setUserInState(null);
    setTokenInState("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };
  const setUser = (user: User | null) => {
    setUserInState(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const setToken = (token: string) => {
    setTokenInState(token);
    localStorage.setItem("accessToken", token);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");
    if (storedUser && storedToken) {
      setUserInState(JSON.parse(storedUser));
      setTokenInState(storedToken);
    }

    if(!storedUser || !storedToken) {
      logOut();
      return
    }
  }, []);


  return(
 <AuthContext.Provider value={{user ,setUser ,token , setToken,logOut}}>
    {children}
  </AuthContext.Provider>
  )

 
}
export const useAuth = () => useContext(AuthContext)


