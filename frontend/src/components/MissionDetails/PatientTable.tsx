import React, { useState, useEffect } from 'react';
import missionPatientService from '../../services/mission-patient';

interface Patient {
  id: number;
  missionId: number;
  patientName: string;
}

const PatientTableData: React.FC<{ missionId: number }> = ({ missionId }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatientName, setNewPatientName] = useState('');
  const [patientCount, setPatientCount] = useState(0);

  // Fetch patients for the mission
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await missionPatientService.findByMissionId(missionId);
        setPatients(data);
        setPatientCount(data.length);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, [missionId]);

  // Handle adding a new patient
  const handleAddPatient = async () => {
    if (!newPatientName.trim()) return;

    try {
      const newPatient = await missionPatientService.create({
        missionId,
        patientName: newPatientName.trim(),
      });

      // Update state with the new patient
      setPatients((prev) => [...prev, newPatient]);
      setPatientCount((prev) => prev + 1);
      setNewPatientName('');
    } catch (error) {
      console.error('Failed to add patient:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Patient Count: {patientCount}</h3>
      </div>

      <div className="overflow-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Patient Name</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="p-2 border-b">{patient.id}</td>
                <td className="p-2 border-b">{patient.patientName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={newPatientName}
          onChange={(e) => setNewPatientName(e.target.value)}
          placeholder="Enter patient name"
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleAddPatient}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Patient
        </button>
      </div>
    </div>
  );
};

export default PatientTableData;
