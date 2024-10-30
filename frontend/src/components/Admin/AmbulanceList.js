import React, { useEffect, useState } from 'react';
import { getAmbulances } from '../../api/api';

function AmbulanceList() {
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    const fetchAmbulances = async () => {
      const data = await getAmbulances();
      setAmbulances(data);
    };
    fetchAmbulances();
  }, []);

  return (
    <div>
      <h2>Ambulance List</h2>
      <ul>
        {ambulances.map((ambulance) => (
          <li key={ambulance.id}>
            {ambulance.vehicleNumber} -{' '}
            <button onClick={() => alert(`Viewing PCRs for Ambulance ID: ${ambulance.id}`)}>
              View PCRs
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AmbulanceList;
