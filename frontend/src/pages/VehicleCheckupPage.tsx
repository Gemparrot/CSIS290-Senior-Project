import React, { useState, useEffect } from 'react';
import vehicleCheckupService from '../services/vehicle-checkups';
import { useNavigate } from 'react-router-dom';

const VehicleCheckupPage: React.FC = () => {
  const [checkup, setCheckup] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCheckup = async () => {
      setIsLoading(true);
      try {
        const data = await vehicleCheckupService.findAll() as any[];
        if (data.length > 0) {
          setCheckup(data[0]);
        } else {
          const newCheckup = await vehicleCheckupService.createCheckup();
          setCheckup(newCheckup);
        }
      } catch (error) {
        console.error('Failed to fetch vehicle checkup:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckup();
  }, []);

  const handleToggleCheckup = async () => {
    if (!checkup) return;

    const newStatus = checkup.is_checked === 'checked' ? 'unchecked' : 'checked';
    setIsLoading(true);

    try {
      const updatedCheckup = await vehicleCheckupService.update(checkup.id, {
        is_checked: newStatus,
      });
      setCheckup(updatedCheckup);
    } catch (error) {
      console.error('Failed to update vehicle checkup:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <h1 className="text-2xl font-bold mb-6 text-center">Vehicle Checkup</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : checkup ? (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vehicle-checkup"
              className="mr-4"
              checked={checkup.is_checked === 'checked'}
              onChange={handleToggleCheckup}
              disabled={isLoading}
            />
            <label htmlFor="vehicle-checkup" className="text-lg">
              {checkup.is_checked === 'checked' ? 'Checked' : 'Unchecked'}
            </label>
          </div>
        ) : (
          <p className="text-gray-500">No checkup record found</p>
        )}
      </div>
    </div>
  );
};

export default VehicleCheckupPage;
