import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Ambulance, 
  Plus, 
  ChevronRight, 
  Server, 
  MapPin 
} from 'lucide-react';
import ambulanceService from '../../services/ambulance';
import CreateAmbulance from '../ManageAmbualnce/CreateAmbualnce';
import { jwtDecode } from 'jwt-decode'; 

interface AmbulanceRegisterPayload {
  id?: number;
  vehicle_number: string;
  password: string;
  adminId: number;
}

interface DecodedToken {
  id: number;
}

const ManageAmbulance: React.FC = () => {
  const [ambulances, setAmbulances] = useState<AmbulanceRegisterPayload[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Decode token to extract admin ID
  const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const fetchAmbulances = async () => {
    try {
      setIsLoading(true);
      if (adminId && !isNaN(adminId)) {
        const response = await ambulanceService.getAllAmbulances(adminId) as AmbulanceRegisterPayload[];
        setAmbulances(response);
      }
    } catch (error) {
      console.error('Error fetching ambulances:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial adminId setup
  useEffect(() => {
    const id = decodeToken();
    setAdminId(id);
  }, []);

  // Fetch ambulances when adminId changes
  useEffect(() => {
    if (adminId) {
      fetchAmbulances();
    }
  }, [adminId]);

  const handleCreateAmbulance = async (vehicleNumber: string, password: string) => {
    if (adminId === null) return;

    try {
      await ambulanceService.register({
        vehicle_number: vehicleNumber,
        password,
        adminId,
      });

      fetchAmbulances(); // Refresh the list
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error creating ambulance:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronRight className="h-6 w-6 transform -rotate-180" />
              </button>
              <div className="flex items-center space-x-3">
                <Ambulance className="h-8 w-8 text-red-600" />
                <h1 className="text-2xl font-extrabold text-gray-900">
                  Manage <span className="text-red-600">Ambulances</span>
                </h1>
              </div>
            </div>
            <div>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="
                  flex items-center px-4 py-2 
                  bg-gradient-to-r from-blue-500 to-blue-700 
                  text-white rounded-md shadow-md 
                  hover:from-blue-600 hover:to-blue-800 
                  transition-all duration-300
                "
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Ambulance
              </button>
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
        ) : ambulances.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambulances.map((ambulance) => (
              <div
                key={ambulance.id}
                onClick={() => navigate(`/admin/manage-ambulance/ambulance/${ambulance.id}/missions`)}
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
                      className="
                        px-3 py-1 rounded-full 
                        bg-blue-100 text-blue-800 
                        text-xs font-medium
                      "
                    >
                      Active
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {ambulance.vehicle_number}
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Ambulance className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              No ambulances found
            </p>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="
                mx-auto flex items-center px-6 py-3 
                bg-gradient-to-r from-blue-500 to-blue-700 
                text-white rounded-md shadow-md 
                hover:from-blue-600 hover:to-blue-800 
                transition-all duration-300
              "
            >
              <Plus className="w-5 h-5 mr-2" />
              Create First Ambulance
            </button>
          </div>
        )}
      </main>

      {/* Popup for Creating Ambulance */}
      {isPopupOpen && (
        <CreateAmbulance
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleCreateAmbulance}
        />
      )}
    </div>
  );
};

export default ManageAmbulance;