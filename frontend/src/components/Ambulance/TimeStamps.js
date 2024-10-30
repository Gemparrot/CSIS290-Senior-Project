import React, { useState } from 'react';
import { recordTimestamp } from '../../api/api';

function Timestamps({ missionId }) {
  const [status, setStatus] = useState('');

  const handleTimestamp = async (eventType) => {
    const timestampData = {
      missionId,
      event: eventType,
      timestamp: new Date().toISOString(),
    };
    await recordTimestamp(timestampData);
    setStatus(`Timestamp recorded for ${eventType}`);
  };

  return (
    <div>
      <h2>Mission Timestamps</h2>
      <p>Mission ID: {missionId}</p>
      <button onClick={() => handleTimestamp('departure_to_case')}>
        Departure to Case
      </button>
      <button onClick={() => handleTimestamp('arrival_to_case')}>
        Arrival to Case
      </button>
      <button onClick={() => handleTimestamp('departure_to_destination')}>
        Departure to Destination
      </button>
      <button onClick={() => handleTimestamp('arrival_to_destination')}>
        Arrival to Destination
      </button>
      <button onClick={() => handleTimestamp('unit_available')}>
        Unit Available
      </button>
      <button onClick={() => handleTimestamp('arrival_to_station')}>
        Arrival to Station
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Timestamps;
