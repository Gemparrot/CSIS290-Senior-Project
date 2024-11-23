import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import RegisterPage from './pages/RegisterPage'; 
import PendingMissionsPage from './pages/PendingPage';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Add the register route */}
        <Route path="/ambulance/homepage" element={<HomePage />} />
        <Route path="/pending-missions" element={<PendingMissionsPage />} />

        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
