import  { createContext } from "react";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string,
  isVerified:boolean,
  status: string,
}



interface AuthContextType {
  user:User | null;
  token:string;
  setToken:(token:string) => void;
  setUser :(user:User | null) => void
  logOut: () => void
}


export const AuthContext = createContext<AuthContextType>(null!)
