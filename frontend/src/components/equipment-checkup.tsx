import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface EquipmentCheckupDto {
  checkupDate: string;
  status: string; // e.g., 'passed', 'failed'
  remarks: string;
}

const EquipmentCheckupPage: React.FC = () => {
  const [checkups, setCheckups] = useState<EquipmentCheckupDto[]>([]);
  const [checkupData, setCheckupData] = useState<EquipmentCheckupDto>({
    checkupDate: '',
    status: '',
    remarks: '',
  });
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCheckupId, setCurrentCheckupId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch all equipment checkups for the ambulance
  const fetchCheckups = async () => {
    try {
      const response = await axios.get('http://localhost:3000/equipment-checkups', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setCheckups(response.data);
    } catch (err) {
      setError('Failed to fetch checkups.');
    }
  };

  useEffect(() => {
    fetchCheckups();
  }, []);

  // Handle input changes for checkup form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckupData({ ...checkupData, [e.target.name]: e.target.value });
  };

  // Handle create checkup
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/equipment-checkups/checkup',
        checkupData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setCheckupData({ checkupDate: '', status: '', remarks: '' });
      fetchCheckups(); // Refresh the checkups list
      navigate('/equipment-checkups/list'); // Redirect to checkup list
    } catch (err) {
      setError('Failed to create checkup.');
    }
  };

  // Handle update checkup
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCheckupId === null) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/equipment-checkups/${currentCheckupId}`,
        checkupData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setCheckupData({ checkupDate: '', status: '', remarks: '' });
      setIsEditing(false);
      setCurrentCheckupId(null);
      fetchCheckups(); // Refresh the checkups list
      navigate('/equipment-checkups/list'); // Redirect to checkup list
    } catch (err) {
      setError('Failed to update checkup.');
    }
  };

  // Handle delete checkup
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/equipment-checkups/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchCheckups(); // Refresh the checkups list
    } catch (err) {
      setError('Failed to delete checkup.');
    }
  };

  // Handle edit checkup
  const handleEdit = (checkup: EquipmentCheckupDto, id: number) => {
    setCheckupData(checkup);
    setIsEditing(true);
    setCurrentCheckupId(id);
  };

  return (
    <div>
      <h1>Equipment Checkup Management</h1>

      <div>
        <h2>{isEditing ? 'Edit Checkup' : 'Create Checkup'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          <input
            type="date"
            name="checkupDate"
            placeholder="Checkup Date"
            value={checkupData.checkupDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={checkupData.status}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="remarks"
            placeholder="Remarks"
            value={checkupData.remarks}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? 'Update Checkup' : 'Create Checkup'}</button>
        </form>
      </div>

      <div>
        <h2>All Equipment Checkups</h2>
        {checkups.length === 0 ? (
          <p>No checkups available.</p>
        ) : (
          <ul>
            {checkups.map((checkup, index) => (
              <li key={index}>
                <p>{checkup.checkupDate} - {checkup.status} - {checkup.remarks}</p>
                <button onClick={() => handleEdit(checkup, index)}>Edit</button>
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

export default EquipmentCheckupPage;
