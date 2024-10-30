import React from 'react';
import { useNavigate } from 'react-router-dom';

function AmbulanceDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Ambulance Dashboard</h2>
      <button onClick={() => navigate('/ambulance/create-mission')}>Create Mission</button>
      <button onClick={() => navigate('/ambulance/pending-missions')}>Pending Missions</button>
      <button onClick={() => navigate('/ambulance/vehicle-checkup')}>Vehicle Checkup</button>
      <button onClick={() => navigate('/ambulance/equipment-checkup')}>Equipment Checkup</button>
    </div>
  );
}

export default AmbulanceDashboard;
