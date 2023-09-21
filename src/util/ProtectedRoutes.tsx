import { Navigate } from 'react-router-dom';
import AdminPanel from '@components/admin-panel/AdminPanel.tsx';

export const ProtectedRoutes = () => {
  const token: string | null = sessionStorage.getItem('token');
  const role: string | null = token !== null ? JSON.parse(token).role : null;

  return token !== null && role === 'admin' ? <AdminPanel /> : <Navigate to='/' />;
};