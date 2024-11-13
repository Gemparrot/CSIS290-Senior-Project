import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AmbulanceDto {
  name: string;
  location: string;
  status: string;
  capacity: number;
}

const AmbulancePage: React.FC = () => {
  const [ambulances, setAmbulances] = useState<AmbulanceDto[]>([]);
  const [ambulanceData, setAmbulanceData] = useState<AmbulanceDto>({
    name: '',
    location: '',
    status: '',
    capacity: 0,
  });
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentAmbulanceId, setCurrentAmbulanceId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchAmbulances = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ambulance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setAmbulances(response.data);
    } catch (err) {
      setError('Failed to fetch ambulances.');
    }
  };

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmbulanceData({ ...ambulanceData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/ambulance/create',
        ambulanceData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setAmbulanceData({ name: '', location: '', status: '', capacity: 0 });
      fetchAmbulances();
      navigate('/ambulance/list');
    } catch (err) {
      setError('Failed to create ambulance.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmbulanceId === null) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/ambulance/${currentAmbulanceId}`,
        ambulanceData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setAmbulanceData({ name: '', location: '', status: '', capacity: 0 });
      setIsEditing(false);
      setCurrentAmbulanceId(null);
      fetchAmbulances();
      navigate('/ambulance/list');
    } catch (err) {
      setError('Failed to update ambulance.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/ambulance/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchAmbulances();
    } catch (err) {
      setError('Failed to delete ambulance.');
    }
  };

  const handleEdit = (ambulance: AmbulanceDto, id: number) => {
    setAmbulanceData(ambulance);
    setIsEditing(true);
    setCurrentAmbulanceId(id);
  };

  return (
    <div>
      <h1>Ambulance Management</h1>

      <div>
        <h2>{isEditing ? 'Edit Ambulance' : 'Create Ambulance'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          <input
            type="text"
            name="name"
            placeholder="Ambulance Name"
            value={ambulanceData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={ambulanceData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={ambulanceData.status}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={ambulanceData.capacity}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? 'Update Ambulance' : 'Create Ambulance'}</button>
        </form>
      </div>

      <div>
        <h2>All Ambulances</h2>
        {ambulances.length === 0 ? (
          <p>No ambulances available.</p>
        ) : (
          <ul>
            {ambulances.map((ambulance, index) => (
              <li key={index}>
                <p>{ambulance.name} - {ambulance.status}</p>
                <button onClick={() => handleEdit(ambulance, index)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AmbulancePage;
