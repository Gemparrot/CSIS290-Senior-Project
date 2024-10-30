import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import AmbulanceDashboard from './components/Ambulance/AmbulanceDashboard';
import Login from './pages/Login';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/ambulance/dashboard" element={<AmbulanceDashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
