import React, { useState, useEffect } from 'react';
import { getMissionDetails, updateMission, uploadMedia } from '../../api/api';

function MissionDetails({ missionId }) {
  const [mission, setMission] = useState(null);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [patientCount, setPatientCount] = useState(1);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMissionDetails = async () => {
      const data = await getMissionDetails(missionId);
      setMission(data);
      setDescription(data.description);
      setAddress(data.address);
      setPatientCount(data.patient_count);
    };
    fetchMissionDetails();
  }, [missionId]);

  const handleUpdate = async () => {
    await updateMission(missionId, { description, address, patientCount });
    alert('Mission updated successfully');
  };

  const handleMediaUpload = async () => {
    const formData = new FormData();
    formData.append('media', media);
    await uploadMedia(missionId, formData);
    alert('Media uploaded successfully');
  };

  return (
    <div>
      <h2>Mission Details</h2>
      {mission && (
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          
          <label>Patient Count:</label>
          <input type="number" value={patientCount} onChange={(e) => setPatientCount(e.target.value)} />

          <button onClick={handleUpdate}>Update Mission</button>

          <label>Upload Media:</label>
          <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
          <button onClick={handleMediaUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default MissionDetails;
