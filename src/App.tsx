import React from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import Home from './pages/Home';
import ViewPage from './pages/ViewPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }): JSX.Element => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>

      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;