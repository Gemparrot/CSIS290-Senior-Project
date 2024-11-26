import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import RegisterPage from './pages/RegisterPage';
import PendingMissionsPage from './pages/PendingPage';
import MissionsPage from './pages/MissionsPage';
// import DynamicForm from './components/PCR/components/DynamicForm';

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/ambulance/homepage"
          element={<ProtectedRoute element={<HomePage />} />}
        />
        <Route
          path="/pending-missions"
          element={<ProtectedRoute element={<PendingMissionsPage />} />}
        />
        <Route
          path="/mission/:missionId/*"
          element={<ProtectedRoute element={<MissionsPage />} />}
        />

        {/* <Route
          path="/missions/:missionId/pcr/:patientId/:sectionId"
          element={<ProtectedRoute element={<DynamicForm />} />}
        /> */}


        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/ambulance/homepage" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;