import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, ChevronRight, Clock, Clipboard, AlertTriangle  } from 'lucide-react';
import pcrService from '../../services/pcr';

// Triage color and label mapping
const TRIAGE_COLORS = {
  0: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    label: 'Green', 
    icon: 'text-green-500'
  },
  1: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    label: 'Yellow', 
    icon: 'text-yellow-500'
  },
  2: { 
    color: 'bg-orange-100 text-orange-800 border-orange-200', 
    label: 'Orange', 
    icon: 'text-orange-500'
  },
  3: { 
    color: 'bg-red-100 text-red-800 border-red-200', 
    label: 'Red', 
    icon: 'text-red-500'
  }
} as const;

interface PCR {
  id: number;
  patientId: number;
  vitals: Record<string, any>;
  clinical_info: Record<string, any>;
  created_at: string;
  triage?: number;
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

        console.log('Full PCR Response:', response);
        console.log('PCR Length:', response.length);
        response.forEach((pcr, index) => {
          console.log(`PCR ${index}:`, pcr);
          console.log(`PCR ${index} Patient ID:`, pcr.patientId);
        });

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

// Render Triage Badge
const renderTriageBadge = (triage?: number) => {
  if (triage === undefined || triage === null) return null;
  
  const triageInfo = TRIAGE_COLORS[triage as keyof typeof TRIAGE_COLORS] || TRIAGE_COLORS[0];
  
  return (
    <div 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full 
        ${triageInfo.color} 
        text-xs font-medium capitalize
        border
      `}
    >
      <AlertTriangle className={`w-3 h-3 mr-1.5 ${triageInfo.icon}`} />
      {triageInfo.label}
    </div>
  );
};

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
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    PCR ID: {pcr.id}
                  </h3>
                 
                  {renderTriageBadge(pcr.triage)}
                </div>
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
