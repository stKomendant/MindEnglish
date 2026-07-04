import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-700 to-fuchsia-800
    flex items-center justify-center relative overflow-hidden"
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
