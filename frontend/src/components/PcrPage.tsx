import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface PCR {
  id: number;
  missionId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const PcrPage: React.FC = () => {
  const [pcrs, setPcrs] = useState<PCR[]>([]);
  const [pcrData, setPcrData] = useState({ description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPcrId, setCurrentPcrId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const { missionId } = useParams();
  const navigate = useNavigate();

  const userType = localStorage.getItem('userType');

  const fetchPcrs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/missions/${missionId}/pcr`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setPcrs(response.data);
    } catch (err) {
      setError('Failed to fetch PCRs.');
    }
  };

  useEffect(() => {
    if (missionId) fetchPcrs();
  },);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPcrData({ ...pcrData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionId) return;

    try {
      await axios.post(
        `http://localhost:3000/missions/${missionId}/pcr`,
        pcrData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setPcrData({ description: '' });
      fetchPcrs();
      navigate(`/missions/${missionId}/pcr/list`);
    } catch (err) {
      setError('Failed to create PCR.');
    }
  };

  const handleEdit = (pcr: PCR, id: number) => {
    setPcrData({ description: pcr.description });
    setIsEditing(true);
    setCurrentPcrId(id);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPcrId === null || !missionId) return;

    try {
      await axios.put(
        `http://localhost:3000/missions/${missionId}/pcr/${currentPcrId}`,
        pcrData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setPcrData({ description: '' });
      setIsEditing(false);
      setCurrentPcrId(null);
      fetchPcrs();
      navigate(`/missions/${missionId}/pcr/list`);
    } catch (err) {
      setError('Failed to update PCR.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!missionId) return;

    try {
      await axios.delete(`http://localhost:3000/missions/${missionId}/pcr/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchPcrs();
    } catch (err) {
      setError('Failed to delete PCR.');
    }
  };

  return (
    <div>
      <h1>PCR Management for Mission {missionId}</h1>

      {/* Form for Creating or Editing PCR */}
      <div>
        <h2>{isEditing ? 'Edit PCR' : 'Create PCR'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          <input
            type="text"
            name="description"
            placeholder="PCR Description"
            value={pcrData.description}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? 'Update PCR' : 'Create PCR'}</button>
        </form>
      </div>

      {/* Display list of PCRs */}
      <div>
        <h2>PCR List</h2>
        {pcrs.length === 0 ? (
          <p>No PCRs available for this mission.</p>
        ) : (
          <ul>
            {pcrs.map((pcr) => (
              <li key={pcr.id}>
                <p>
                  {pcr.description} - Created on: {pcr.createdAt}
                </p>
                {userType === 'ambulance' && (
                  <>
                    <button onClick={() => handleEdit(pcr, pcr.id)}>Edit</button>
                    <button onClick={() => handleDelete(pcr.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PcrPage;
