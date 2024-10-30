import React, { useEffect, useState } from 'react';
import { getTeamMembers } from '../../api/api';

function TeamMemberList() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const data = await getTeamMembers();
      setTeamMembers(data);
    };
    fetchTeamMembers();
  }, []);

  return (
    <div>
      <h2>Team Member List</h2>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>
            {member.name}
            <button onClick={() => alert(`Edit Team Member ID: ${member.id}`)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamMemberList;
