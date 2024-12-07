import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeamMembers from '../components/tabs/TeamMembers';
import Missions from '../components/tabs/MissionDetails';
import PCR from '../components/tabs/PCR';
import TimestampComponent from '../components/tabs/TimeStamps'; 
import missionPatientService from '../services/mission-patient';

interface Patient {
  id: number;
  missionId: number;
  patientName: string;
}

const MissionsPage = () => {
  const navigate = useNavigate();
  const { missionId } = useParams<{ missionId: string }>(); 
  const [activeTab, setActiveTab] = useState<'team' | 'missions' | 'pcr' | 'timestamps'>('team');
  const headerRef = useRef<HTMLDivElement>(null);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMissionPatients = async () => {
    if (!missionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const missionPatients = await missionPatientService.findByMissionId(parseInt(missionId, 10));
      setPatients(missionPatients);
    } catch (err) {
      console.error('Failed to fetch mission patients:', err);
      setError('Failed to load patients for this mission');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMissionPatients();
  }, [missionId]);

  const getTabStyle = (tab: 'team' | 'missions' | 'pcr' | 'timestamps') => {
    return `px-4 py-2 font-medium text-sm transition-colors duration-200 ${
      activeTab === tab
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-700'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div ref={headerRef} className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col">
            {/* Back button and title */}
            <div className="flex items-center py-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">Mission Details</h1>
            </div>

            {/* Navigation tabs */}
            <div className="flex space-x-8 border-b border-gray-200">
              <button
                className={getTabStyle('team')}
                onClick={() => setActiveTab('team')}
              >
                Team
              </button>
              <button
                className={getTabStyle('missions')}
                onClick={() => setActiveTab('missions')}
              >
                Missions
              </button>
              <button
                className={getTabStyle('pcr')}
                onClick={() => setActiveTab('pcr')}
              >
                PCR
              </button>
              <button
                className={getTabStyle('timestamps')}
                onClick={() => setActiveTab('timestamps')}
              >
                Timestamps
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'team' && <TeamMembers />}
        {activeTab === 'missions' && missionId && (
          <Missions 
            missionId={parseInt(missionId, 10)} 
            patients={patients}
            isLoading={isLoading}
            error={error}
          />
        )}
        {activeTab === 'pcr' && <PCR />}
        {activeTab === 'timestamps' && missionId && (
          <TimestampComponent missionId={parseInt(missionId, 10)} />
        )}
      </div>
    </div>
  );
};

export default MissionsPage;