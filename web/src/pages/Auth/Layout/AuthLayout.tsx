import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { useEffect, type ReactNode } from "react";

const RedirectAuthenticatedUser = ({children}: {children: ReactNode}) => {
 const {isAuthenticated, user} = useAuthStore();

  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

const AuthLayout = () => {
  const { checkAuth, isCheckingAuth} = useAuthStore();

useEffect(() => {
  checkAuth()
}, [checkAuth])

if (isCheckingAuth) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-700 to-fuchsia-800
    flex items-center justify-center relative overflow-hidden">
      <p className="text-white text-lg">Checking authentication...</p>
    </div>
  )
}

return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-700 to-fuchsia-800
    flex items-center justify-center relative overflow-hidden"
    >
      <RedirectAuthenticatedUser>
        <Outlet />
      </RedirectAuthenticatedUser>
    </div>
  );
};

export default AuthLayout;
