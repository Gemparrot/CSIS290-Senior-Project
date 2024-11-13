import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Timestamp {
  id: number;
  time: string;
  createdAt: string;
  updatedAt: string;
}

const TimeStamps: React.FC = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
  const [newTimestamp, setNewTimestamp] = useState({ time: '' });
  const [error, setError] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const userType = localStorage.getItem('userType');

  const fetchTimestamps = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/missions/${missionId}/timestamps`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setTimestamps(response.data);
    } catch (err) {
      setError('Failed to fetch timestamps.');
    }
  };

  useEffect(() => {
    if (userType === 'ambulance') {
      fetchTimestamps();
    } else {
      navigate('/unauthorized');
    }
  },);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTimestamp({ ...newTimestamp, [name]: value });
  };

  const handleCreateTimestamp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/missions/${missionId}/timestamps`,
        newTimestamp,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setNewTimestamp({ time: '' });
      fetchTimestamps();
      navigate(`/missions/${missionId}/timestamps`);
    } catch (err) {
      setError('Failed to create timestamp.');
    }
  };

  const handleViewTimestamp = (id: number) => {
    navigate(`/missions/${missionId}/timestamps/${id}`);
  };

  return (
    <div>
      <h1>Mission Timestamps</h1>

      {/* Form for creating a new timestamp */}
      <div>
        <h2>Create a New Timestamp</h2>
        <form onSubmit={handleCreateTimestamp}>
          <input
            type="datetime-local"
            name="time"
            value={newTimestamp.time}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Create Timestamp</button>
        </form>
      </div>

      {/* Display the list of timestamps */}
      <div>
        <h2>Timestamp List</h2>
        {timestamps.length === 0 ? (
          <p>No timestamps found for this mission.</p>
        ) : (
          <ul>
            {timestamps.map((timestamp) => (
              <li key={timestamp.id}>
                <p>Time: {timestamp.time}</p>
                <p>Created on: {timestamp.createdAt}</p>
                <p>Updated on: {timestamp.updatedAt}</p>
                <button onClick={() => handleViewTimestamp(timestamp.id)}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TimeStamps;
