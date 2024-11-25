import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import teamMemberService from '../../services/team-memebers';
import MissionTeamMember from '../forms/Mission-TeamMember';

interface TeamMemberDto {
  id: number;
  name?: string;
}

const TeamMembers: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberDto | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const data = await teamMemberService.findAll() as TeamMemberDto[];
        setTeamMembers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load team members');
        console.error('Error fetching team members:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleOpenPopup = (member: TeamMemberDto) => {
    setSelectedTeamMember(member);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedTeamMember(null);
    setIsPopupOpen(false);
  };

  if (isLoading) {
    return <div className="p-4">Loading team members...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {teamMembers.length === 0 ? (
        <div className="text-center text-gray-500">No team members found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleOpenPopup(member)}
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-shadow duration-200">
                <span className="text-2xl font-medium text-blue-600">
                  {member.name?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {member.name || 'Unknown'}
              </span>
            </div>
          ))}
        </div>
      )}

        {missionId && (
            <MissionTeamMember
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                teamMember={selectedTeamMember}
                missionId={missionId} 
            />
      )}
    </div>
  );
};

export default TeamMembers;
