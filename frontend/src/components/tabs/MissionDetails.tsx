import React from 'react';
import MissionTableInfo from '../MissionDetails/MissionTable';
import PatientTableData from '../MissionDetails/PatientTable';
import MissionTeamMember from '../MissionDetails/TeamMemberTable';

const Mission: React.FC<{ missionId: number }> = ({ missionId }) => {
  return (
    <div className="space-y-6">
      {/* Mission Table Info */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Mission Information</h2>
        <MissionTableInfo />
      </div>

      {/* Patient Table Data */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Patient Data</h2>
        <PatientTableData missionId={missionId} />
      </div>

      {/* Mission Team Member */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Team Members</h2>
        <MissionTeamMember missionId={missionId} />

      </div>
    </div>
  );
};

export default Mission;
