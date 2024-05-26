import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';
import ReactLoading from 'react-loading';

export default function RequireAuth({ children }) { // 👈 1
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) { 
    return <ReactLoading type="bars" color="lightblue"/>
  }

  if (isAuthenticated) { // 👈 3
    return children;
  }

  return <Navigate to="/login" />; // 👈 4
}
