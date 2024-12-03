import React, { useState, useEffect } from 'react';
import timestampsService, { Timestamp, TimestampEvent } from '../../services/timestamps';

interface TimestampComponentProps {
  missionId: number;
  onClose?: () => void;
}

const TimestampComponent: React.FC<TimestampComponentProps> = ({ missionId, onClose }) => {
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTimestamps = async () => {
      try {
        const fetchedTimestamps = await timestampsService.findAll(missionId);
        setTimestamps(fetchedTimestamps);
      } catch (error) {
        console.error('Failed to fetch timestamps:', error);
      }
    };

    fetchTimestamps();
  }, [missionId]);

  const handleCreateTimestamp = async (event: TimestampEvent) => {
    try {
      const createdTimestamp = await timestampsService.create(missionId, {
        event,
        timestamp: new Date(),
      });

      setTimestamps(prev => [...prev, createdTimestamp]);
    } catch (error) {
      console.error('Failed to create timestamp:', error);
    }
  };

  const timestampEvents: TimestampEvent[] = [
    'departure_to_case',
    'arrival_to_case',
    'departure_to_destination',
    'arrival_to_destination',
    'unit_available',
    'arrival_to_station',
  ];

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-6 relative">
      {onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}

      {/* Display Current Date and Time */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{currentDateTime}</h2>
      </div>

      {/* Timestamp Creation Section */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Mission Timestamps</h2>
      <div className="flex flex-col space-y-3">
        {timestampEvents.map((event, index) => (
          <button
            key={event}
            onClick={() => handleCreateTimestamp(event)}
            className="flex items-center bg-indigo-500 text-white py-2 px-4 rounded shadow-md hover:bg-indigo-600 transition-all duration-200"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-700 text-white mr-3 font-bold">
              {index + 1}
            </span>
            {event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Existing Timestamps List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Existing Timestamps</h3>
        {timestamps.length === 0 ? (
          <p className="text-gray-500 italic">No timestamps recorded yet.</p>
        ) : (
          <ul className="space-y-2">
            {timestamps.map(ts => (
              <li 
                key={ts.id} 
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border"
              >
                <span className="font-medium text-indigo-600">
                  {ts.event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(ts.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimestampComponent;
