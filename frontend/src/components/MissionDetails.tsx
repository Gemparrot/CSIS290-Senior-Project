import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import missionService from '../services/missions';
import missionTeamMemberService from '../services/mission-team-member';
import MissionTeamMember from './Mission-TeamMember';

interface Mission {
  id: number;
  mission_type: 'emergency' | 'transportation';
  description: string;
  address: string;
  ambulanceId?: number;
  status: 'pending' | 'active' | 'completed' | 'canceled';
  images?: any;
  patient_count?: number;
  canceled_at?: Date;
  completed_at?: Date;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
}

const MissionDetails: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [editedMission, setEditedMission] = useState<Mission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMissionData();
  }, [missionId]);

  const fetchMissionData = async () => {
    if (!missionId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const [missionData, teamMembersData] = await Promise.all([
        missionService.findOne(Number(missionId)),
        missionTeamMemberService.findByMissionId(Number(missionId))
      ]);
      
      setMission(missionData as Mission);
      setEditedMission(missionData as Mission);
      setTeamMembers(teamMembersData as TeamMember[]);
    } catch (error) {
      console.error('Error fetching mission data:', error);
      setError('Failed to load mission data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMission(mission);
  };

  const handleSave = async () => {
    if (!editedMission || !missionId) return;

    try {
      await missionService.update(Number(missionId), editedMission);
      setMission(editedMission);
      setIsEditing(false);
      await fetchMissionData();
    } catch (error) {
      console.error('Error updating mission:', error);
      setError('Failed to update mission. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!editedMission) return;
    
    setEditedMission({
      ...editedMission,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading mission details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Mission not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mission Details</h1>
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Mission
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mission Type
            </label>
            {isEditing ? (
              <select
                name="mission_type"
                value={editedMission?.mission_type}
                onChange={handleInputChange}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            {isEditing ? (
              <select
                name="status"
                value={editedMission?.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            ) : (
              <div className="p-2 bg-gray-50 rounded">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${mission.status === 'active' ? 'bg-green-100 text-green-800' : 
                    mission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    mission.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'}`}>
                  {mission.status}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Count
            </label>
            {isEditing ? (
              <input
                type="number"
                name="patient_count"
                value={editedMission?.patient_count || 0}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">
                {mission.patient_count || 0}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ambulance ID
            </label>
            {isEditing ? (
              <input
                type="number"
                name="ambulanceId"
                value={editedMission?.ambulanceId || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">
                {mission.ambulanceId || 'Not assigned'}
              </div>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editedMission?.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{mission.address}</div>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            {isEditing ? (
              <textarea
                name="description"
                value={editedMission?.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{mission.description}</div>
            )}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Team Members</h3>
            <button
              onClick={() => setIsTeamMemberModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Team Member
            </button>
          </div>

          <div className="space-y-2">
            {teamMembers.length === 0 ? (
              <div className="text-gray-500 text-center py-4">
                No team members assigned yet
              </div>
            ) : (
              teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-3 bg-gray-50 rounded flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{member.name}</span>
                    <span className="ml-2 text-gray-600">- {member.role}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTeamMember(member);
                      setIsTeamMemberModalOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit Role
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {missionId && (
      <MissionTeamMember
        isOpen={isTeamMemberModalOpen}
        onClose={() => {
          setIsTeamMemberModalOpen(false);
          setSelectedTeamMember(null);
          fetchMissionData();
        }}
        teamMember={selectedTeamMember}
        missionId={missionId}
      />
        )}
    </div>
  );
};

export default MissionDetails;