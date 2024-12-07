import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import HomePage from './pages/HomePage';
import PendingMissionsPage from './pages/PendingPage';
import MissionsPage from './pages/MissionsPage';
import VehicleCheckupPage from './pages/VehicleCheckupPage';
import EquipmentCheckupPage from './pages/EquipmentCheckupPage';

import AdminDashboard from './pages/AdminDashboard';
import ManageAmbulance from './components/ManageAmbualnce/ManageAmbualnce';
import ManageTeamMembers from './components/ManageTeamMember/ManageTeamMembers';
import AmbualnceMissions from './components/ManageAmbualnce/AmbualnceMissions';
import MissionPCRs from './components/ManageAmbualnce/MissionPCRs';
import PCRDetails from './components/ManageAmbualnce/ViewPCR';

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
        <Route
          path="/vehicle-checkups"
          element={<ProtectedRoute element={<VehicleCheckupPage />} />}
        />
        <Route
          path="/equipment-checkup"
          element={<ProtectedRoute element={<EquipmentCheckupPage />} />}
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />
         <Route
          path="/admin/manage-ambulance"
          element={<ProtectedRoute element={<ManageAmbulance />} />}
        />
         <Route 
          path="/admin/manage-ambulance/ambulance/:id/missions" 
          element={<ProtectedRoute element={<AmbualnceMissions />} />} 
        />
        <Route
          path="/admin/manage-ambulance/ambulance/:id/missions/:missionId"
          element={<ProtectedRoute element={<MissionPCRs />} />}
        />
        <Route 
          path="/admin/manage-ambulance/ambulance/:id/missions/:missionId/pcr/:pcrId" 
          element={<PCRDetails />} 
        />

        
         <Route
          path="/admin/manage-team-members"
          element={<ProtectedRoute element={<ManageTeamMembers />} />}
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
