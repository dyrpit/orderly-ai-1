import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const token: string | null = sessionStorage.getItem('token');
  const role: string | null = token !== null ? JSON.parse(token).role : null;

  return token !== null && role === 'Admin' ? <AdminPanel /> : <Navigate to='/' />;
};