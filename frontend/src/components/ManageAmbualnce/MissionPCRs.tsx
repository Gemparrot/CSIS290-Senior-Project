import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, ChevronRight, Clock, Clipboard } from 'lucide-react';
import pcrService from '../../services/pcr';

interface PCR {
  id: number;
  patientId: number;
  vitals: Record<string, any>;
  clinical_info: Record<string, any>;
  created_at: string;
}

const AmbulancePCRs: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [pcrs, setPCRs] = useState<PCR[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPCRs = async () => {
      try {
        if (!missionId) {
          throw new Error('No mission ID provided');
        }

        const response = await pcrService.findAll(Number(missionId)) as PCR[];
        setPCRs(response);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching PCRs:', err);
        setError('Failed to load PCRs');
        setIsLoading(false);
      }
    };

    fetchPCRs();
  }, [missionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(`/admin/manage-ambulance/ambulance/${id}/missions`)} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronRight className="h-6 w-6 transform -rotate-180" />
              </button>
              <div className="flex items-center space-x-3">
                <Clipboard className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-extrabold text-gray-900">
                  PCRs <span className="text-blue-600">List</span>
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
              <List className="h-12 w-12 text-blue-600" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            {error}
          </div>
        ) : pcrs.length > 0 ? (
          <div className="space-y-4">
            {pcrs.map((pcr) => (
              <div
                key={pcr.id}
                onClick={() => navigate(`/admin/manage-ambulance/ambulance/${id}/missions/${missionId}/pcr/${pcr.id}`)}
                className="
                  bg-white rounded-lg shadow-sm p-4 
                  hover:shadow-md transition-shadow duration-200 
                  cursor-pointer flex justify-between items-center border border-gray-100
                "
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    PCR ID: {pcr.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Patient ID: {pcr.patientId}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(pcr.created_at).toLocaleString()}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <List className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              No PCRs found for this mission
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AmbulancePCRs;
