import { createContext, useEffect, useState } from 'react';

type AuthContextValue = {
  user: User | null;
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
