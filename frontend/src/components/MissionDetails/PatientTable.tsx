import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import missionPatientService from '../../services/mission-patient';

interface Patient {
  id: number;
  missionId: number;
  patientName: string;
}

interface PatientTableDataProps {
  missionId: number;
  patients?: Patient[];
}

const PatientTableData: React.FC<PatientTableDataProps> = ({ 
  missionId, 
  patients: propPatients 
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatientName, setNewPatientName] = useState('');
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (propPatients && propPatients.length > 0) {
          setPatients(propPatients);
          setPatientCount(propPatients.length);
        } else {
          const data = await missionPatientService.findByMissionId(missionId);
          setPatients(data);
          setPatientCount(data.length);
        }
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, [missionId, propPatients]);

  const handleAddPatient = async () => {
    if (!newPatientName.trim()) return;

    try {
      const newPatient = await missionPatientService.create({
        missionId,
        patientName: newPatientName.trim(),
      });

      setPatients((prev) => [...prev, newPatient]);
      setPatientCount((prev) => prev + 1);
      setNewPatientName('');
    } catch (error) {
      console.error('Failed to add patient:', error);
    }
  };

  const handleDeletePatient = async (patientId: number) => {
    try {
      await missionPatientService.delete(patientId);
      setPatients((prev) => prev.filter(patient => patient.id !== patientId));
      setPatientCount((prev) => prev - 1);
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Patient List</h2>
        <div className="text-gray-600 font-medium">Total Patients: {patientCount}</div>
      </div>

      <div className="mb-4 flex">
        <input
          type="text"
          value={newPatientName}
          onChange={(e) => setNewPatientName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddPatient()}
          placeholder="Enter patient name"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleAddPatient}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 flex items-center"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Add Patient
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
              <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="p-3 text-sm font-medium text-gray-900">{patient.patientName}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTableData;