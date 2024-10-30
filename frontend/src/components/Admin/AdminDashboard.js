import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/admin/register-ambulance')}>Register Ambulance</button>
      <button onClick={() => navigate('/admin/create-team-member')}>Create Team Member</button>
      <button onClick={() => navigate('/admin/ambulance-list')}>View Ambulance List</button>
      <button onClick={() => navigate('/admin/team-member-list')}>View Team Member List</button>
    </div>
  );
}

export default AdminDashboard;
