import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import teamMemberService from '../../services/team-memebers';
import MissionTeamMember from '../forms/Mission-TeamMember';
import SearchBar from '../forms/Search-Engine';
import { useNavigate } from 'react-router-dom';

interface TeamMemberDto {
  id: number;
  name?: string;
}

const TeamMembers: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([]);
  const [filteredTeamMembers, setFilteredTeamMembers] = useState<TeamMemberDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberDto | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const data = await teamMemberService.findAll() as TeamMemberDto[];
        setTeamMembers(data);
        setFilteredTeamMembers(data);
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

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = teamMembers.filter((member) =>
      member.name?.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTeamMembers(filtered);
  }, [searchQuery, teamMembers]);

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
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Mission Team Members</h2>
          </div>

          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          {filteredTeamMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
              {filteredTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleOpenPopup(member)}
                >
                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-3 shadow-md">
                    <span className="text-3xl font-semibold text-indigo-600">
                      {member.name?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {member.name || 'Unknown'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">No team members found</p>
          )}
        </div>

        {missionId && isPopupOpen && (
          <MissionTeamMember
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            teamMember={selectedTeamMember}
            missionId={missionId}
          />
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
