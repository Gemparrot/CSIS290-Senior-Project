import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AmbulanceLogin from './pages/AmbulanceLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AmbulanceDashboard from './components/Ambulance/AmbulanceDashboard';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/ambulance/login" element={<AmbulanceLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/ambulance/dashboard" element={<AmbulanceDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
