import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ambulanceService from '../services/ambulance';

interface Ambulance {
  vehicle_number: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [vehicleNumber, setVehicleNumber] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmbulanceDetails = async () => {
      try {
        const response = await ambulanceService.getMyAmbulance();
        const ambulance = response as Ambulance;
        setVehicleNumber(ambulance.vehicle_number);
      } catch (error) {
        console.error('Error fetching ambulance details:', error);
        setVehicleNumber('Error loading');
      }
    };

    fetchAmbulanceDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ambulanceId');
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="RescueSync Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold">RescueSync</h1>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigate('/pending-pcr')}
                className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Pending PCR
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/equipment-checkup')}
                className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Equipment Checkup
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/vehicle-checkup')}
                className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Vehicle Checkup
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/create-mission')}
                className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Create Mission
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Section */}
        <main className="flex-1 bg-gray-100 p-8 flex items-center justify-center">
          {/* Placeholder for future technology */}
          <p className="text-gray-500">Main content area will be added later.</p>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 p-4 text-center">
        Vehicle Number: {vehicleNumber || 'Loading...'}
      </footer>
    </div>
  );
};

export default HomePage;