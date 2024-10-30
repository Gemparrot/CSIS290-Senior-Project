import React, { useState, useEffect } from 'react';
import { getTeamMemberDetails, updateTeamMember } from '../../api/api';

function EditTeamMember({ teamMemberId }) {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchTeamMemberDetails = async () => {
      const data = await getTeamMemberDetails(teamMemberId);
      setName(data.name);
    };
    fetchTeamMemberDetails();
  }, [teamMemberId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTeamMember(teamMemberId, { name });
    alert('Team Member updated successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Team Member</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Update Team Member</button>
    </form>
  );
}

export default EditTeamMember;
