import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import LiveData from './pages/LiveData';
import Export from './pages/Export';
import Settings from './pages/Settings';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';



function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
                <LiveData />
            }
          />
          <Route
            path="/live-data"
            element={
                <LiveData />
            }
          />
          <Route
            path="/export"
            element={
                <Export />
            }
          />
          <Route
            path="/settings"
            element={
                <Settings />
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;