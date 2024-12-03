import React, { useState, useEffect } from 'react';
import teamMemberService from '../../services/team-memebers';
import Header from '../layout/Header';
import CreateTeamMember from './CreateTeamMember';
import SearchBar from '../forms/Search-Engine';
import { useNavigate } from 'react-router-dom';

interface TeamMemberDto {
  id: number;
  name: string;
}

const ManageTeamMembers: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMemberDto[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTeamMembers = async () => {
    try {
      const data = await teamMemberService.findAll() as TeamMemberDto[];
      setTeamMembers(data);
      setFilteredMembers(data); // Initialize filtered list
      setError(null);
    } catch (err) {
      setError('Failed to load team members');
      console.error('Error fetching team members:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleCreateTeamMember = async (name: string) => {
    try {
      await teamMemberService.create({ name });
      fetchTeamMembers(); // Refresh the list
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error creating team member:', error);
    }
  };

  // Filter members based on the search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = teamMembers.filter((member) =>
      member.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMembers(filtered);
  }, [searchQuery, teamMembers]);

  if (isLoading) {
    return <div className="p-4">Loading team members...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onNavigate={() => navigate('/admin/dashboard')} title="" />
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Team Members</h2>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Member
            </button>
          </div>

          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-3 shadow-md">
                    <span className="text-3xl font-semibold text-indigo-600">
                      {member.name[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">No team members found</p>
          )}
        </div>

        {isPopupOpen && (
          <CreateTeamMember
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleCreateTeamMember}
          />
        )}
      </div>
    </div>
  );
};

export default ManageTeamMembers;
