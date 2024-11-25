import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import missionService from '../../services/missions';
import { Mission, MissionDto } from '../../services/missions';

const MissionDetails: React.FC = () => {
    const { missionId } = useParams<{ missionId: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMission, setEditedMission] = useState<MissionDto | null>(null);

//   console.log('Mission ID:', missionId);

  useEffect(() => {
    const fetchMission = async () => {
      if (!missionId) return;
      try {
        const fetchedMission = await missionService.findOne(Number(missionId)); 
        setMission(fetchedMission);
      } catch (error) {
        console.error('Failed to fetch mission:', error);
      }
    };
    fetchMission();
  }, [missionId]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedMission(mission ? { ...mission } : null);
  };

  const handleSave = async () => {
    if (!editedMission || !mission) return;
    try {
      const { id, created_at, updated_at, ...missionDto } = editedMission as Mission;
      const updatedMission = await missionService.update(mission.id, missionDto);
      setMission(updatedMission);
      setIsEditing(false);
      setEditedMission(null);
    } catch (error) {
      console.error('Failed to save mission:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMission(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: keyof MissionDto
  ) => {
    if (editedMission) {
      setEditedMission({ ...editedMission, [field]: e.target.value });
    }
  };

  if (!mission) {
    return <div>Loading mission details...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Mission Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mission Type</label>
            {isEditing ? (
              <select
                value={editedMission?.mission_type || ''}
                onChange={(e) => handleChange(e, 'mission_type')}
                className="w-full p-2 border rounded"
              >
                <option value="emergency">Emergency</option>
                <option value="transportation">Transportation</option>
              </select>
            ) : (
              <div className="p-2 bg-gray-50 rounded">{mission.mission_type}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            {isEditing ? (
              <select
                value={editedMission?.status || ''}
                onChange={(e) => handleChange(e, 'status')}
                className="w-full p-2 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            ) : (
              <div className="p-2 bg-gray-50 rounded">{mission.status}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={editedMission?.address || ''}
                onChange={(e) => handleChange(e, 'address')}
                className="w-full p-2 border rounded"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{mission.address}</div>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            {isEditing ? (
              <textarea
                value={editedMission?.description || ''}
                onChange={(e) => handleChange(e, 'description')}
                className="w-full p-2 border rounded"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{mission.description}</div>
            )}
          </div>
        </div>
        <div className="mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit Mission
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionDetails;
