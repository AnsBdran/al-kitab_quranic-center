import axios from 'axios';
import { useState } from 'react';
import useAuthContext from './useAuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthContext();

  const login = async (values: LoginFormData) => {
    setLoading(true);
    setError(null);
    await (() => new Promise((res) => setTimeout(res, 500)))();
    console.log(import.meta.env.VITE_SERVER_URL);
    const { data } = await axios.post(
      import.meta.env.VITE_SERVER_URL + 'auth/login',
      values
    );
    if (data.error) {
      console.log(data);
      setLoading(false);
      return setError(data.error);
    }
    console.log('we got', data);
    setUser(data.user);
    setLoading(false);
  };

  return { login, error, loading, setError };
};
export default useLogin;
