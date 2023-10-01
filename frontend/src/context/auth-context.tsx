import { createContext, useEffect, useState } from 'react';
import { User } from '../types';

type AuthContextValue = {
  user: User | null;
  // setUser: (value: User | null) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<null | User>(null);

  // const setUser = (value: User | null) => {
  // setUserState(value);
  // if (!user) return localStorage.removeItem('user');
  // };

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem('user') || 'null');
    if (_user) return setUser(_user);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
