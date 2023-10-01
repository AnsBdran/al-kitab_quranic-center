// import { useState } from 'react';
import useAuthContext from './useAuthContext';

const useLogout = () => {
  //   const [error, setError] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const logout = () => {
    setUser(null);
  };

  return { logout };
};

export default useLogout;
