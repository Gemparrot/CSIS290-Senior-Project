import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface MissionTeamMember {
  id: number;
  name: string;
  role: string;
  missionId: number;
}

const MissionTeamMemberPage: React.FC = () => {
  const [members, setMembers] = useState<MissionTeamMember[]>([]);
  const [memberData, setMemberData] = useState({
    name: '',
    role: '',
    missionId: 0,
  });
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/mission-team-members', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setMembers(response.data);
    } catch (err) {
      setError('Failed to fetch team members.');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/mission-team-members',
        memberData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setMemberData({ name: '', role: '', missionId: 0 });
      fetchMembers();
      navigate('/mission-team-members/list');
    } catch (err) {
      setError('Failed to create team member.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMemberId === null) return;

    try {
      await axios.patch(
        `http://localhost:3000/mission-team-members/${currentMemberId}`,
        memberData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setMemberData({ name: '', role: '', missionId: 0 });
      setIsEditing(false);
      setCurrentMemberId(null);
      fetchMembers();
      navigate('/mission-team-members/list');
    } catch (err) {
      setError('Failed to update team member.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/mission-team-members/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchMembers();
    } catch (err) {
      setError('Failed to delete team member.');
    }
  };

  const handleEdit = (member: MissionTeamMember, id: number) => {
    setMemberData({
      name: member.name,
      role: member.role,
      missionId: member.missionId,
    });
    setIsEditing(true);
    setCurrentMemberId(id);
  };

  return (
    <div>
      <h1>Mission Team Members Management</h1>

      <div>
        <h2>{isEditing ? 'Edit Team Member' : 'Create Team Member'}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={memberData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={memberData.role}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="missionId"
            placeholder="Mission ID"
            value={memberData.missionId}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? 'Update Team Member' : 'Create Team Member'}</button>
        </form>
      </div>

      <div>
        <h2>All Mission Team Members</h2>
        {members.length === 0 ? (
          <p>No team members available.</p>
        ) : (
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <p>{member.name} - {member.role} - Mission ID: {member.missionId}</p>
                <button onClick={() => handleEdit(member, member.id)}>Edit</button>
                <button onClick={() => handleDelete(member.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MissionTeamMemberPage;
