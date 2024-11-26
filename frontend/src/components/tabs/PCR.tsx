import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import missionPatientService from '../../services/mission-patient';
import DynamicPCRForm from '../PCR/components/DynamicPCRForm';


// Patient Interface
interface Patient {
  id: number;
  patientName: string;
}

// PCR Sections Interface
interface PCRSection {
  id: string;
  title: string;
  image: string;
  route: string;
}

const PCRComponent: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // PCR Sections Configuration
  const pcrSections: PCRSection[] = [
    {
      id: 'primary-assessment',
      title: 'Primary Assessment',
      image: '/images/primary-assessment.svg',
      route: 'PrimaryAssessment'
    },
    {
      id: 'body',
      title: 'Body',
      image: '/images/body.svg',
      route: 'body'
    },
    {
      id: 'vitals',
      title: 'Vitals & Observations',
      image: '/images/vitals.svg',
      route: 'vitals'
    },
    {
      id: 'management',
      title: 'Management',
      image: '/images/management.svg',
      route: 'management'
    },
    {
      id: 'clinical-info',
      title: 'Clinical Information',
      image: '/images/clinical-info.svg',
      route: 'clinical-info'
    },
    {
      id: 'patient-details',
      title: 'Patient Details',
      image: '/images/patient-details.svg',
      route: 'patient-details'
    }
  ];

  // Fetch patients for the mission on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      if (missionId) {
        try {
          const missionPatients = await missionPatientService.findByMissionId(parseInt(missionId, 10));
          setPatients(missionPatients);
        } catch (error) {
          console.error('Failed to fetch patients:', error);
        }
      }
    };

    fetchPatients();
  }, [missionId]);

  const handleFormSubmit = (formData: { [key: string]: string }) => {
    // Handle form submission, e.g., save to backend
    console.log('Form submitted for patient:', selectedPatient);
    console.log('Form data:', formData);
    // You can add API call here to save the PCR data
    setIsFormVisible(false);
  }; 

  return (
    <div className="space-y-6">
      {/* Patient Selection Dropdown */}
      <div className="mb-6">
        <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700">
          Select Patient
        </label>
        <select
          id="patient-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedPatient?.id || ''}
          onChange={(e) => {
            const patient = patients.find(p => p.id === parseInt(e.target.value, 10));
            setSelectedPatient(patient || null);
          }}
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.patientName}
            </option>
          ))}
        </select>
      </div>

      {/* PCR Sections Grid */}
      {selectedPatient && !isFormVisible && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pcrSections.map((section) => (
            <div 
              key={section.id}
              onClick={() => setIsFormVisible(true)}
              className="cursor-pointer bg-white shadow rounded-lg p-4 flex flex-col items-center hover:bg-gray-50 transition-colors"
            >
              <img 
                src={section.image} 
                alt={section.title} 
                className="w-16 h-16 mb-2"
              />
              <h3 className="text-sm font-medium text-center">{section.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Form */}
      {selectedPatient && isFormVisible && (
        <div>
          <button 
            onClick={() => setIsFormVisible(false)}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Back to Sections
          </button>
          <DynamicPCRForm 
            onSubmit={handleFormSubmit}
            initialSection="primary-assessment"
          />
        </div>
      )}

      {/* No Patient Selected Message */}
      {!selectedPatient && (
        <div className="text-center text-gray-500">
          Please select a patient to view PCR sections
        </div>
      )}
    </div>
  );
};

export default PCRComponent;