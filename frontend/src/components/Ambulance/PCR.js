import React, { useState } from 'react';
import { submitPCR } from '../../api/api';

function PCRForm() {
  const [primaryAssessment, setPrimaryAssessment] = useState('');
  const [bodySection, setBodySection] = useState('');
  const [vitals, setVitals] = useState('');
  const [management, setManagement] = useState('');
  const [clinicalInfo, setClinicalInfo] = useState('');
  const [patientDetails, setPatientDetails] = useState({ name: '', age: '', gender: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pcrData = { primaryAssessment, bodySection, vitals, management, clinicalInfo, patientDetails };
    await submitPCR(pcrData);
    alert('PCR Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>PCR Form</h2>
      <label>Primary Assessment:</label>
      <textarea onChange={(e) => setPrimaryAssessment(e.target.value)}></textarea>
      <label>Body Section:</label>
      <textarea onChange={(e) => setBodySection(e.target.value)}></textarea>
      <label>Vitals:</label>
      <textarea onChange={(e) => setVitals(e.target.value)}></textarea>
      <label>Management Techniques:</label>
      <textarea onChange={(e) => setManagement(e.target.value)}></textarea>
      <label>Clinical Information:</label>
      <textarea onChange={(e) => setClinicalInfo(e.target.value)}></textarea>
      <h3>Patient Details</h3>
      <input type="text" placeholder="Name" onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })} />
      <input type="number" placeholder="Age" onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })} />
      <input type="text" placeholder="Gender" onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })} />
      <button type="submit">Submit PCR</button>
    </form>
  );
}

export default PCRForm;
