import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pcrService from '../../services/pcr';
import Header from '../layout/Header';

const PCRDetails: React.FC = () => {
  const { missionId, pcrId } = useParams<{ missionId: string; pcrId: string }>();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [pcrDetails, setPCRDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPCRDetails = async () => {
      try {
        if (!missionId || !pcrId) {
          throw new Error('Missing mission ID or PCR ID');
        }

        const response = await pcrService.findOne(Number(missionId), Number(pcrId));
        setPCRDetails(response);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching PCR details:', err);
        setError('Failed to load PCR details');
        setIsLoading(false);
      }
    };

    fetchPCRDetails();
  }, [missionId, pcrId]);

  const renderJSON = (data: any, level = 0) => {
    return Object.entries(data).map(([key, value]) => {
      const isObject = typeof value === 'object' && value !== null;

      return (
        <div
          key={key}
          className={`pl-${level * 4} mb-2`}
          style={{ borderLeft: level > 0 ? '2px solid #e5e7eb' : 'none', paddingLeft: '1rem' }}
        >
          <div className="flex items-start">
            <span className="font-medium text-gray-800 capitalize">{key}:</span>
            {!isObject && <span className="ml-2 text-gray-600">{String(value)}</span>}
          </div>
          {isObject && <div className="mt-2">{renderJSON(value, level + 1)}</div>}
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading PCR details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        onNavigate={() => navigate(`/admin/manage-ambulance/ambulance/${id}/missions/${missionId}`)}
        title={`PCR Details - ID: ${pcrId}`}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">PCR Details</h2>
          {pcrDetails ? (
            <div className="text-sm text-gray-800">{renderJSON(pcrDetails)}</div>
          ) : (
            <p className="text-gray-500">No PCR details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PCRDetails;
