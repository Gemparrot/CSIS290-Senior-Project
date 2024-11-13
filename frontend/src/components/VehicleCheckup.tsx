import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface VehicleCheckup {
  id: number;
  date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const VehicleCheckup: React.FC = () => {
  const navigate = useNavigate();
  const [checkups, setCheckups] = useState<VehicleCheckup[]>([]);
  const [newCheckup, setNewCheckup] = useState({ date: '', status: '' });
  const [error, setError] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const userType = localStorage.getItem('userType');

  const fetchCheckups = async () => {
    try {
      const response = await axios.get('http://localhost:3000/vehicle-checkups', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setCheckups(response.data);
    } catch (err) {
      setError('Failed to fetch checkups.');
    }
  };

  useEffect(() => {
    if (userType === 'ambulance') {
      fetchCheckups();
    } else {
      navigate('/unauthorized');
    }
  },);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCheckup({ ...newCheckup, [name]: value });
  };

  const handleCreateCheckup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await axios.post('http://localhost:3000/vehicle-checkups/checkup', newCheckup, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setNewCheckup({ date: '', status: '' });
      fetchCheckups();
      navigate('/vehicle-checkups');
    } catch (err) {
      setError('Failed to create checkup.');
    }
    setIsCreating(false);
  };

  const handleViewCheckup = (id: number) => {
    navigate(`/vehicle-checkups/${id}`);
  };

  const handleDeleteCheckup = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/vehicle-checkups/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      fetchCheckups();
    } catch (err) {
      setError('Failed to delete checkup.');
    }
  };

  return (
    <div>
      <h1>Vehicle Checkups</h1>

      {/* Form for creating a new checkup */}
      <div>
        <h2>Create a New Vehicle Checkup</h2>
        <form onSubmit={handleCreateCheckup}>
          <div>
            <label>Date:</label>
            <input
              type="datetime-local"
              name="date"
              value={newCheckup.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={newCheckup.status}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Checkup'}
          </button>
        </form>
      </div>

      {/* Display the list of checkups */}
      <div>
        <h2>Checkup List</h2>
        {checkups.length === 0 ? (
          <p>No checkups found for this ambulance.</p>
        ) : (
          <ul>
            {checkups.map((checkup) => (
              <li key={checkup.id}>
                <p>Date: {checkup.date}</p>
                <p>Status: {checkup.status}</p>
                <p>Created on: {checkup.createdAt}</p>
                <p>Updated on: {checkup.updatedAt}</p>
                <button onClick={() => handleViewCheckup(checkup.id)}>
                  View Details
                </button>
                <button onClick={() => handleDeleteCheckup(checkup.id)}>
                  Delete
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

export default VehicleCheckup;
