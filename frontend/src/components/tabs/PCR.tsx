import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Stethoscope, 
  HeartPulse, 
  User, 
  ClipboardList, 
  ActivityIcon, 
  FileText,
  LucideIcon // Import the type
} from 'lucide-react';
import missionPatientService from '../../services/mission-patient';
import pcrService from '../../services/pcr';
import DynamicPCRForm from '../PCR/components/DynamicPCRForm';

interface Patient {
  id: number;
  patientName: string;
}

interface PCRSection {
  id: string;
  title: string;
  icon: LucideIcon; // Use LucideIcon type
  route: string;
}

const PCRComponent: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // PCR Sections Configuration with Lucide Icons
  const pcrSections: PCRSection[] = [
    {
      id: 'primary-assessment',
      title: 'Primary Assessment',
      icon: Stethoscope,
      route: 'PrimaryAssessment',
    },
    {
      id: 'body',
      title: 'Body',
      icon: User,
      route: 'body',
    },
    {
      id: 'vitals',
      title: 'Vitals & Observations',
      icon: HeartPulse,
      route: 'vitals',
    },
    {
      id: 'management',
      title: 'Management',
      icon: ClipboardList,
      route: 'management',
    },
    {
      id: 'clinical-info',
      title: 'Clinical Information',
      icon: ActivityIcon,
      route: 'clinical-info',
    },
    {
      id: 'patient-details',
      title: 'Patient Details',
      icon: FileText,
      route: 'patient-details',
    },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      if (missionId) {
        try {
          const missionPatients = await missionPatientService.findByMissionId(parseInt(missionId, 10));
          setPatients(missionPatients);
          console.log("patient nb", missionPatients);
        } catch (error) {
          console.error('Failed to fetch patients:', error);
        }
      }
    };

    fetchPatients();
  }, [missionId]);

  const createPCRForPatient = async (patientId: number) => {
    if (!missionId) return;

    try {
      // Check if PCR already exists
      const existingPCR = await pcrService.getPCRidByPatient(parseInt(missionId, 10), patientId);

      if (!existingPCR) {
        // Create PCR only if it doesn't exist
        await pcrService.create(parseInt(missionId, 10), patientId, {
          primary_assessment: {},
          body_section: {},
          vitals: {},
          management: {},
          clinical_info: {},
          patient_details: {},
        });
        console.log(`PCR created for patient ID ${patientId}`);
      } else {
        console.log(`PCR already exists for patient ID ${patientId}`);
      }
    } catch (error) {
      console.error('Failed to create PCR:', error);
    }
  };

  const handlePatientSelect = async (patient: Patient | null) => {
    setSelectedPatient(patient);
    
    if (patient) {
      await createPCRForPatient(patient.id);
    }
  };

  const handleSectionClick = (section: PCRSection) => {
    setSelectedSection(section.id);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (formData: { [key: string]: string }) => {
    console.log('Form submitted for patient:', selectedPatient);
    console.log('Form data:', formData);
    console.log('Section:', selectedSection);

    if (!selectedPatient || !selectedSection || !missionId) return;

  try {
    const sectionKey = (() => {
      switch (selectedSection) {
        case 'primary-assessment': return 'primary_assessment';
        case 'body': return 'body_section';
        case 'vitals': return 'vitals';
        case 'management': return 'management';
        case 'clinical-info': return 'clinical_info';
        case 'patient-details': return 'patient_details';
        default: return '';
      }
    })();

    const updateDto = {
      [sectionKey]: formData,
      missionId: parseInt(missionId, 10),
      patientId: selectedPatient.id
    };

    const existingPCRId = await pcrService.getPCRidByPatient(parseInt(missionId, 10), selectedPatient.id);

    console.log("dto", updateDto)
    if (existingPCRId && typeof existingPCRId === 'number') {
      await pcrService.update(parseInt(missionId, 10), existingPCRId, updateDto);
      console.log(`PCR updated for patient ${selectedPatient.patientName}, section: ${selectedSection}`);
    }

    setIsFormVisible(false);
    setSelectedSection(null);
  } catch (error) {
    console.error('Failed to update PCR:', error);
  }
};

return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
    {/* Patient Selection Dropdown */}
    <div className="mb-6">
      <label 
        htmlFor="patient-select" 
        className="block text-lg font-semibold text-gray-800 mb-2"
      >
        Select Patient
      </label>
      <div className="relative">
        <select
          id="patient-select"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-transparent text-gray-700 
            appearance-none pr-10"
          value={selectedPatient?.id || ''}
          onChange={(e) => {
            const patient = patients.find(p => p.id === parseInt(e.target.value, 10));
            handlePatientSelect(patient || null);
          }}
        >
          <option value="" className="text-gray-400">Select a patient</option>
          {patients.map((patient) => (
            <option 
              key={patient.id} 
              value={patient.id} 
              className="text-gray-700"
            >
              {patient.patientName}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <User className="text-gray-400" size={20} />
        </div>
      </div>
    </div>

    {/* Form Sections Grid */}
    {selectedPatient && !isFormVisible && (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pcrSections.map((section) => (
          <div 
            key={section.id}
            onClick={() => handleSectionClick(section)}
            className="cursor-pointer bg-white border-2 border-gray-200 
              rounded-xl p-4 flex flex-col items-center 
              hover:bg-blue-50 hover:border-blue-200 
              transition-all duration-300 ease-in-out 
              transform hover:-translate-y-1 hover:shadow-md"
          >
            <section.icon 
              className="w-12 h-12 mb-3 text-blue-600" 
              strokeWidth={1.5}
            />
            <h3 className="text-sm font-medium text-center text-gray-700">
              {section.title}
            </h3>
          </div>
        ))}
      </div>
    )}

    {/* Dynamic Form */}
    {selectedPatient && isFormVisible && selectedSection && (
      <div>
        <button 
          onClick={() => {
            setIsFormVisible(false);
            setSelectedSection(null);
          }}
          className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 
            rounded-lg hover:bg-gray-200 transition-colors 
            flex items-center space-x-2"
        >
          <span>← Back to Sections</span>
        </button>
        <DynamicPCRForm 
          onSubmit={handleFormSubmit}
          initialSection={selectedSection}
        />
      </div>
    )}

    {/* No Patient Selected Message */}
    {!selectedPatient && (
      <div className="text-center text-gray-500 bg-gray-100 
        rounded-lg p-8 border border-gray-200">
        <FileText className="mx-auto mb-4 text-gray-400" size={48} />
        <p>Please select a patient to view PCR sections</p>
      </div>
    )}
  </div>
);
};

export default PCRComponent;