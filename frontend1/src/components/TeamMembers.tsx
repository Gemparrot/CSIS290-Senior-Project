import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const TeamMembers: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    role: '',
  });
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const userType = localStorage.getItem('userType');
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/team-members', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setTeamMembers(response.data);
    } catch (err) {
      setError('Failed to fetch team members.');
    }
  };

  useEffect(() => {
    if (userType === 'admin') {
      fetchTeamMembers();
    } else {
      navigate('/unauthorized');
    }
  },);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeamMember({
      ...newTeamMember,
      [name]: value,
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/team-members',
        newTeamMember,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setNewTeamMember({ name: '', role: '' });
      fetchTeamMembers();
      navigate('/team-members');
    } catch (err) {
      setError('Failed to create team member.');
    }
  };

  const handleEdit = (teamMember: TeamMember) => {
    setEditingTeamMember(teamMember);
    setNewTeamMember({
      name: teamMember.name,
      role: teamMember.role,
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeamMember) {
      try {
        await axios.put(
          `http://localhost:3000/team-members/${editingTeamMember.id}`,
          newTeamMember,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          }
        );
        setIsEditing(false);
        setEditingTeamMember(null);
        setNewTeamMember({ name: '', role: '' });
        fetchTeamMembers();
        navigate('/team-members');
      } catch (err) {
        setError('Failed to update team member.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/team-members/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchTeamMembers();
    } catch (err) {
      setError('Failed to delete team member.');
    }
  };

  return (
    <div>
      <h1>Team Members</h1>

      {/* Form for creating or updating team member */}
      <div>
        <h2>{isEditing ? 'Edit Team Member' : 'Create Team Member'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          <input
            type="text"
            name="name"
            placeholder="Team Member Name"
            value={newTeamMember.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Team Member Role"
            value={newTeamMember.role}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{isEditing ? 'Update Team Member' : 'Create Team Member'}</button>
        </form>
      </div>

      {/* Display team members */}
      <div>
        <h2>Team Member List</h2>
        {teamMembers.length === 0 ? (
          <p>No team members found.</p>
        ) : (
          <ul>
            {teamMembers.map((teamMember) => (
              <li key={teamMember.id}>
                <p>{teamMember.name} - Role: {teamMember.role}</p>
                <p>Created on: {teamMember.createdAt}</p>
                <p>Updated on: {teamMember.updatedAt}</p>
                <button onClick={() => handleEdit(teamMember)}>Edit</button>
                <button onClick={() => handleDelete(teamMember.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TeamMembers;
