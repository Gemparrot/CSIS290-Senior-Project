import React, { useState } from 'react';
import { createTeamMember } from '../../api/api';

function CreateTeamMember() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTeamMember({ name });
    alert('Team Member Created');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Team Member</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateTeamMember;
