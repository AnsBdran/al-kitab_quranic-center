import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { ReactNode } from 'react';

type RedirectProps = {
  children?: ReactNode;
};

const RedirectPath = ({ children }: RedirectProps) => {
  const location = useLocation();
  const { user } = useAuthContext();

  if (user && location.pathname === '/dashboard') return children;
  if (user && location.pathname === '/login')
    return <Navigate to='/dashboard' />;
  if (!user && location.pathname === '/login') return children;
  if (!user && location.pathname === '/dashboard')
    return <Navigate to='/login' />;
};

export default RedirectPath;
