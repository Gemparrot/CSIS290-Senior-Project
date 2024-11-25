import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import missionService from '../services/missions';

interface PendingMission {
  id: number;
  mission_type: 'emergency' | 'transportation';
  description: string;
  address: string;
  patient_name: string;
  created_at: string;
}

const PendingMissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [missions, setMissions] = useState<PendingMission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingMissions();
  }, []);

  const fetchPendingMissions = async () => {
    try {
      const data = await missionService.findPending() as PendingMission[];
      setMissions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load pending missions');
      console.error('Error fetching pending missions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getMissionTypeStyle = (type: 'emergency' | 'transportation') => {
    return type === 'emergency' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading pending missions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/ambulance/homepage')} 
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
            <h1 className="text-2xl font-bold">RescueSync</h1>
          </div>
        </div>
      </div>
  
      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Pending Missions</h2>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {missions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No pending missions found
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  onClick={() => navigate(`/mission/${mission.id}`)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                          M: {mission.id}
                        </span>

                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMissionTypeStyle(mission.mission_type)}`}>
                          {mission.mission_type}
                        </span>
                        
                        <h3 className="text-lg font-medium">
                          {mission.patient_name}
                        </h3>
                      </div>
                      
                      <div className="text-gray-600">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          <span>{mission.address}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {formatDate(mission.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingMissionsPage;