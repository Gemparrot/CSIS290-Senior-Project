import React, { useState } from 'react';
import missionTeamMemberService from '../services/mission-team-member';

type Role = 'missionLeader' | 'driver' | 'emt1' | 'emt2' | 'emt3';

interface TeamMemberDto {
  id: number;
  name?: string;
}

interface MissionTeamMemberProps {
  isOpen: boolean;
  onClose: () => void;
  teamMember: TeamMemberDto | null;
  missionId: string;
}

const roles = [
  { id: 'missionLeader' as Role, label: 'Mission Leader' },
  { id: 'driver' as Role, label: 'Driver' },
  { id: 'emt1' as Role, label: 'EMT 1' },
  { id: 'emt2' as Role, label: 'EMT 2' },
  { id: 'emt3' as Role, label: 'EMT 3' },
];

const MissionTeamMember: React.FC<MissionTeamMemberProps> = ({
  isOpen,
  onClose,
  teamMember,
  missionId,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedRole || !teamMember) {
      setError('Please select a role');
      return;
    }

    setIsSubmitting(true);

    try {
      await missionTeamMemberService.create({
        missionId: Number(missionId),
        teamMemberId: teamMember.id,
        role: selectedRole
      });
      onClose();
    } catch (error) {
      console.error('Error handling mission team member:', error);
      setError('An error occurred while processing the request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign Role</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {teamMember?.name && (
          <div className="mb-4">
            <p className="text-gray-600">Assigning role to: <span className="font-medium">{teamMember.name}</span></p>
          </div>
        )}
        
        <div className="space-y-3 mb-6">
          {roles.map((role) => (
            <label 
              key={role.id} 
              className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="role"
                value={role.id}
                checked={selectedRole === role.id}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-gray-700">{role.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'Assigning...' : 'Assign Role'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionTeamMember;