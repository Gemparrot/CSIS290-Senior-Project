import React, { useEffect, useState } from 'react';
import { Edit2Icon, SaveIcon, XIcon } from 'lucide-react';
import missionTeamMemberService from '../../services/mission-team-member';

type Role = 'missionLeader' | 'driver' | 'emt1' | 'emt2' | 'emt3';

interface TeamMember {
  id: number;
  name: string;
}

interface MissionTeamMember {
  id: number;
  missionId: number;
  role: Role;
  teamMember: TeamMember;
}

const RoleDisplayNames: Record<Role, string> = {
  missionLeader: 'Mission Leader',
  driver: 'Driver',
  emt1: 'EMT 1',
  emt2: 'EMT 2',
  emt3: 'EMT 3'
};

const MissionTeamMember: React.FC<{ missionId: number }> = ({ missionId }) => {
  const [missionTeamMembers, setMissionTeamMembers] = useState<MissionTeamMember[]>([]);
  const [editingRole, setEditingRole] = useState<{ id: number; role: Role } | null>(null);

  useEffect(() => {
    const fetchMissionTeamMembers = async () => {
      try {
        const missionMembers: MissionTeamMember[] = await missionTeamMemberService.findByMissionId(missionId) as MissionTeamMember[];
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="space-y-4">
        {missionTeamMembers.map((member) => (
          <div 
            key={member.id} 
            className="flex items-center justify-between bg-gray-50 p-4 rounded-md"
          >
            <div className="flex items-center space-x-4">
              <div className="font-medium text-gray-900">{member.teamMember.name}</div>
              {editingRole?.id === member.id ? (
                <select
                  value={editingRole.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value as Role)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Object.entries(RoleDisplayNames).map(([role, displayName]) => (
                    <option key={role} value={role}>{displayName}</option>
                  ))}
                </select>
              ) : (
                <span className="text-gray-600 text-sm">
                  {RoleDisplayNames[member.role]}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {editingRole?.id === member.id ? (
                <>
                  <button
                    onClick={handleSaveRole}
                    className="text-green-500 hover:text-green-700"
                  >
                    <SaveIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setEditingRole(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditingRole({ id: member.id, role: member.role })}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2Icon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionTeamMember;