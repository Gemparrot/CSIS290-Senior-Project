import React, { useState, useEffect } from 'react';
import { getAmbulanceDetails, updateAmbulance } from '../../api/api';

function EditAmbulance({ ambulanceId }) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchAmbulanceDetails = async () => {
      const data = await getAmbulanceDetails(ambulanceId);
      setVehicleNumber(data.vehicle_number);
      setPassword(''); // Password is not retrieved for security
    };
    fetchAmbulanceDetails();
  }, [ambulanceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAmbulance(ambulanceId, { vehicleNumber, password });
    alert('Ambulance updated successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Ambulance</h2>
      <label>Vehicle Number:</label>
      <input
        type="text"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
      />
      <label>Password (optional):</label>
      <input
        type="password"
        placeholder="Leave blank to keep current password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update Ambulance</button>
    </form>
  );
}

export default EditAmbulance;
