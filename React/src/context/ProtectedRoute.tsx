// // ProtectedRoute.tsx
// import React, { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     // Not authenticated? Redirect to login.
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    // While checking authentication, display a loading indicator
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
