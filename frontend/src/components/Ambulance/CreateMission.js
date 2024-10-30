import React, { useState } from 'react';
import { createMission } from '../../api/api';

function CreateMission() {
  const [missionType, setMissionType] = useState('emergency');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMission({ missionType, description, address });
    alert('Mission Created');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Mission</h2>
      <label>Mission Type:</label>
      <select onChange={(e) => setMissionType(e.target.value)}>
        <option value="emergency">Emergency</option>
        <option value="transportation">Transportation</option>
      </select>
      <label>Description:</label>
      <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
      <label>Address:</label>
      <input type="text" onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">Create Mission</button>
    </form>
  );
}

export default CreateMission;
