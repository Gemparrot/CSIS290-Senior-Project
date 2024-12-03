import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import missionService from '../services/missions';

interface PendingMission {
  id: number;
  mission_type: 'emergency' | 'transportation';
  description: string;
  address: string;
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
      const data = (await missionService.findPending()) as unknown as PendingMission[];
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={() => navigate('/ambulance/homepage')}
            className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Pending Missions</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Loading missions...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : missions.length === 0 ? (
          <p className="text-center text-gray-500">No pending missions found</p>
        ) : (
          <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-md">
            {missions.map((mission) => (
              <li
                key={mission.id}
                onClick={() => navigate(`/mission/${mission.id}`)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getMissionTypeStyle(
                        mission.mission_type
                      )}`}
                    >
                      {mission.mission_type}
                    </span>
                    <span className="font-bold text-gray-800">
                      {mission.description}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center space-x-2 mt-1">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{mission.address}</span>
                  </p>
                </div>
                <div className="text-sm text-gray-500">{formatDate(mission.created_at)}</div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default PendingMissionsPage;
