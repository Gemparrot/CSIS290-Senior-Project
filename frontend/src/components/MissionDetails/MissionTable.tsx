import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Edit2Icon, SaveIcon, XIcon } from 'lucide-react';
import missionService from '../../services/missions';
import { Mission, MissionDto } from '../../services/missions';

const MissionDetails: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMission, setEditedMission] = useState<MissionDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMission = async () => {
      if (!missionId) return;
      try {
        const fetchedMission = await missionService.findOne(Number(missionId));
        setMission(fetchedMission);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch mission:', err);
        setError('Unable to load mission details.');
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
    } catch (err) {
      console.error('Failed to save mission:', err);
      setError('Error saving mission. Please try again.');
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

  const renderField = (
    label: string,
    value: string | undefined,
    field: keyof MissionDto,
    type: 'input' | 'textarea' | 'select',
    options?: string[]
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {isEditing ? (
        type === 'select' && options ? (
          <select
            value={editedMission?.[field] || ''}
            onChange={(e) => handleChange(e, field)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            value={editedMission?.[field] || ''}
            onChange={(e) => handleChange(e, field)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        ) : (
          <input
            type="text"
            value={editedMission?.[field] || ''}
            onChange={(e) => handleChange(e, field)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )
      ) : (
        <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
          {value || 'N/A'}
        </div>
      )}
    </div>
  );

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="p-6 text-center text-gray-600 animate-pulse">
        Loading mission details...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Mission Details</h1>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Edit2Icon className="mr-2 h-5 w-5" />
            Edit Mission
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField('Mission Type', mission.mission_type, 'mission_type', 'select', [
            'emergency',
            'transportation',
          ])}
          {renderField('Status', mission.status, 'status', 'select', [
            'pending',
            'active',
            'completed',
            'canceled',
          ])}
          {renderField('Address', mission.address, 'address', 'input')}
          {renderField('Description', mission.description, 'description', 'textarea')}
        </div>

        {isEditing && (
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <SaveIcon className="mr-2 h-5 w-5" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              <XIcon className="mr-2 h-5 w-5" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionDetails;