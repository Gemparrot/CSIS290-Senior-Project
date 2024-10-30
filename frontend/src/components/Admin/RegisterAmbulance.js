import React, { useState } from 'react';
import { registerAmbulance } from '../../api/api';

function RegisterAmbulance() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerAmbulance({ vehicleNumber, password });
    alert('Ambulance Registered');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Ambulance</h2>
      <input type="text" placeholder="Vehicle Number" onChange={(e) => setVehicleNumber(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterAmbulance;
