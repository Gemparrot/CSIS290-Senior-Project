import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Server, MapPin, List, Clock } from 'lucide-react';
import missionService from '../../services/missions';
import { Mission } from '../../services/missions';

const AmbulanceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        if (!id) {
          throw new Error('No ambulance ID provided');
        }

        // Directly fetch missions for this ambulance
        const missionsResponse = await missionService.findAllForAmbulance(Number(id));
        setMissions(missionsResponse);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching missions:', err);
        setError('Failed to load missions');
        setIsLoading(false);
      }
    };

    fetchMissions();
  }, [id]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status?: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatMissionType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/admin/manage-ambulance')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronRight className="h-6 w-6 transform -rotate-180" />
              </button>
              <div className="flex items-center space-x-3">
              
                <h1 className="text-2xl font-extrabold text-gray-900">
                  Ambulance <span className="text-blue-600">Missions</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin">
              <Server className="h-12 w-12 text-blue-600" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            {error}
          </div>
        ) : missions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => navigate(`/admin/manage-ambulance/ambulance/${id}/missions/${mission.id}`)}
                className="
                  bg-white rounded-2xl shadow-lg 
                  hover:shadow-xl transform hover:-translate-y-2 
                  transition-all duration-300 
                  cursor-pointer overflow-hidden
                  border border-gray-100
                "
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                    <span 
                      className={`
                        px-3 py-1 rounded-full 
                        text-xs font-medium
                        ${getStatusColor(mission.status)}
                      `}
                    >
                      {formatStatus(mission.status)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {formatMissionType(mission.mission_type)} Mission
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    {new Date(mission.created_at).toLocaleString()}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate max-w-[200px]">
                      {mission.address}
                    </p>
                    <p className="text-sm text-gray-600 truncate max-w-[200px]">
                      {mission.description}
                    </p>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <List className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              No missions found for this ambulance
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AmbulanceDetails;