import React, { useEffect, useState } from 'react';
import missionTeamMemberService from '../../services/mission-team-member';
import teamMemberService from '../../services/team-memebers';

type Role = 'missionLeader' | 'driver' | 'emt1' | 'emt2' | 'emt3';

interface TeamMember {
  id: number;
  name: string;
}

interface MissionTeamMember {
  id: number;
  missionId: number;
  role: Role;
  teamMember: TeamMember; // This is already nested inside the MissionTeamMember object
}

const MissionTeamMember: React.FC<{ missionId: number }> = ({ missionId }) => {
  const [missionTeamMembers, setMissionTeamMembers] = useState<MissionTeamMember[]>([]);
  const [editingRole, setEditingRole] = useState<{ id: number; role: Role } | null>(null);

  useEffect(() => {
    const fetchMissionTeamMembers = async () => {
      try {
        // Fetch mission team members for the specific missionId
        const missionMembers: MissionTeamMember[] = await missionTeamMemberService.findByMissionId(missionId) as MissionTeamMember[];
        console.log('Mission Team Members:', missionMembers); // Log mission members

        setMissionTeamMembers(missionMembers);
      } catch (error) {
        console.error('Error fetching mission team members:', error);
      }
    };

    fetchMissionTeamMembers();
  }, [missionId]);

  const handleRoleChange = (id: number, newRole: Role) => {
    setEditingRole({ id, role: newRole });
  };

  const handleSaveRole = async () => {
    if (!editingRole) return;
    try {
      await missionTeamMemberService.update(editingRole.id, { role: editingRole.role });
      setMissionTeamMembers((prev) =>
        prev.map((member) =>
          member.id === editingRole.id ? { ...member, role: editingRole.role } : member
        )
      );
      setEditingRole(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
  };

  return (
    <div className="space-y-4">
      {missionTeamMembers.map((member) => (
        <div
          key={member.id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded"
        >
          <div>
            <span className="font-medium">{member.teamMember.name}</span> {/* Directly access name */}
            <span className="text-sm text-gray-500 ml-2">({member.role})</span>
          </div>
          {editingRole?.id === member.id ? (
            <div className="flex items-center space-x-2">
              <select
                value={editingRole.role}
                onChange={(e) => handleRoleChange(member.id, e.target.value as Role)}
                className="border rounded px-2 py-1"
              >
                <option value="missionLeader">Mission Leader</option>
                <option value="driver">Driver</option>
                <option value="emt1">EMT 1</option>
                <option value="emt2">EMT 2</option>
                <option value="emt3">EMT 3</option>
              </select>
              <button
                onClick={handleSaveRole}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingRole({ id: member.id, role: member.role })}
              className="px-3 py-1 bg-gray-200 text-black rounded"
            >
              Edit Role
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MissionTeamMember;
