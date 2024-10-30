import React, { useEffect, useState } from 'react';
import { getPendingMissions } from '../../api/api';

function PendingMissions() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const data = await getPendingMissions();
      setMissions(data);
    };
    fetchMissions();
  }, []);

  return (
    <div>
      <h2>Pending Missions</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission.id}>
            {mission.address} - Status: {mission.status}
            <button onClick={() => alert(`Viewing details for Mission ID: ${mission.id}`)}>
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingMissions;
