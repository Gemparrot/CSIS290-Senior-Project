import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Mission {
  id: number;
  description: string;
  status: string;
  ambulanceId: number | null;
  createdAt: string;
  updatedAt: string;
}

const MissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [missionData, setMissionData] = useState({
    description: '',
    status: 'pending',
    ambulanceId: null as number | null,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentMissionId, setCurrentMissionId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const userType = localStorage.getItem('userType');

  const fetchMissions = async () => {
    try {
      let url = 'http://localhost:3000/missions';
      if (userType === 'ambulance') {
        url = 'http://localhost:3000/missions/pending';
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setMissions(response.data);
    } catch (err) {
      setError('Failed to fetch missions.');
    }
  };

  useEffect(() => {
    fetchMissions();
  },);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'ambulanceId') {
      setMissionData({ ...missionData, [name]: value ? Number(value) : null });
    } else {
      setMissionData({ ...missionData, [name]: value });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/missions',
        missionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setMissionData({ description: '', status: 'pending', ambulanceId: null });
      fetchMissions();
      navigate('/missions/list');
    } catch (err) {
      setError('Failed to create mission.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMissionId === null) return;

    try {
      await axios.put(
        `http://localhost:3000/missions/${currentMissionId}`,
        missionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setMissionData({ description: '', status: 'pending', ambulanceId: null });
      setIsEditing(false);
      setCurrentMissionId(null);
      fetchMissions();
      navigate('/missions/list');
    } catch (err) {
      setError('Failed to update mission.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/missions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchMissions();
    } catch (err) {
      setError('Failed to delete mission.');
    }
  };

  const handleEdit = (mission: Mission, id: number) => {
    setMissionData({
      description: mission.description,
      status: mission.status,
      ambulanceId: mission.ambulanceId,
    });
    setIsEditing(true);
    setCurrentMissionId(id);
  };

  return (
    <div>
      <h1>Mission Management</h1>

      <div>
        <h2>{isEditing ? 'Edit Mission' : 'Create Mission'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={missionData.description}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={missionData.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {userType === 'admin' && (
            <input
              type="number"
              name="ambulanceId"
              placeholder="Ambulance ID"
              value={missionData.ambulanceId || ''}
              onChange={handleChange}
            />
          )}
          <button type="submit">{isEditing ? 'Update Mission' : 'Create Mission'}</button>
        </form>
      </div>

      <div>
        <h2>All Missions</h2>
        {missions.length === 0 ? (
          <p>No missions available.</p>
        ) : (
          <ul>
            {missions.map((mission) => (
              <li key={mission.id}>
                <p>
                  {mission.description} - {mission.status} - Created on: {mission.createdAt}
                </p>
                {userType === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(mission, mission.id)}>Edit</button>
                    <button onClick={() => handleDelete(mission.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MissionsPage;
