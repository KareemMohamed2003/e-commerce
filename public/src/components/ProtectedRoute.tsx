import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ children }: any) {
   const currentUser = useSelector((state: any) => state.user);
   const location = useLocation();
   const path = location.pathname
   const allowedPaths = ["/LoginPage", "/RegistrationPage"]
   // we need to also check if the location is not a loginPage 
   // if user is logged out and the  intented page to naviagte to is login or /RegistrationPage
   if (!currentUser.userId && allowedPaths.includes(path)) return children
   return currentUser.userId ? children : <Navigate to="/LoginPage" replace />;
}
