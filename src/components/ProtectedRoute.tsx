import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';
import { ReactElement } from 'react';
interface ProtectedRouteProps {
  children: ReactElement;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const currentUser = useAppSelector((state) => state.user);
  const location = useLocation();
  const path = location.pathname;
  const allowedPaths = ['/LoginPage', '/RegistrationPage'];

  // if user is logged out and the  intented page to navigate to is login or /RegistrationPage
  if (!currentUser.userId && allowedPaths.includes(path)) {
    return children;
  }
  return currentUser.userId ? children : <Navigate to="/LoginPage" replace />;
}
