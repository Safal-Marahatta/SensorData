// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { LoginPage } from './pages/Login';
// import LiveData from './pages/LiveData';
// import Export from './pages/Export';
// import Settings from './pages/Settings';
// import { AuthProvider, useAuth } from './context/AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { user } = useAuth();
//   return user ? <>{children}</> : <Navigate to="/login" replace />;
// }

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <LiveData />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/live-data"
//             element={
//               <ProtectedRoute>
//                 <LiveData />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/export"
//             element={
//               <ProtectedRoute>
//                 <Export />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/settings"
//             element={
//               <ProtectedRoute>
//                 <Settings />
//               </ProtectedRoute>
//             }
//           />
//           {/* Fallback route */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import LiveData from "./pages/LiveData";
import Export from "./pages/Export";
// import Settings from "./pages/Settings";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import AlertsAndPlansDisplay from "./pages/information";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LiveData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/information"
            element={
              <ProtectedRoute>
                <AlertsAndPlansDisplay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/live-data"
            element={
              <ProtectedRoute>
                <LiveData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/export"
            element={
              <ProtectedRoute>
                <Export />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          /> */}
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
