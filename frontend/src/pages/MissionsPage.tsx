import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamMembers from '../components/TeamMembers';
import Missions from '../components/MissionDetails';

// Placeholder components for Missions and PCR
const PCR = () => <div className="p-4">PCR component (to be implemented)</div>;

// Main MissionsPage component
const MissionsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'team' | 'missions' | 'pcr'>('team');

  const getTabStyle = (tab: 'team' | 'missions' | 'pcr') => {
    return `px-4 py-2 font-medium text-sm transition-colors duration-200 ${
      activeTab === tab
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-700'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
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
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'team' && <TeamMembers />}
        {activeTab === 'missions' && <Missions />}
        {activeTab === 'pcr' && <PCR />}
      </div>
    </div>
  );
};

export default MissionsPage;