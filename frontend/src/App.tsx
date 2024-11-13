import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminPage from './components/admin';
import AmbulancePage from './components/ambulance';
import EquipmentCheckupPage from './components/equipment-checkup';
import MissionTeamMemberPage from './components/mission-team-member';
import MissionsPage from './components/MissionsPage';
import PcrPage from './components/PcrPage';
import TeamMembersPage from './components/TeamMembers';
import TimeStampsPage from './components/TimeStamps';
import VehicleCheckupPage from './components/VehicleCheckup';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navbar for navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/missions">Missions</Link>
            </li>
            <li>
              <Link to="/pcr">PCR</Link>
            </li>
            <li>
              <Link to="/team-members">Team Members</Link>
            </li>
            <li>
              <Link to="/timestamps">Time Stamps</Link>
            </li>
            <li>
              <Link to="/vehicle-checkups">Vehicle Checkups</Link>
            </li>
            <li>
              <Link to="/equipment-checkups">Equipment Checkups</Link>
            </li>
            <li>
              <Link to="/mission-team-members">Mission Team Members</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/ambulance">Ambulance</Link>
            </li>
          </ul>
        </nav>

        {/* Routes for the different pages */}
        <Routes>
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/pcr" element={<PcrPage />} />
          <Route path="/team-members" element={<TeamMembersPage />} />
          <Route path="/timestamps" element={<TimeStampsPage />} />
          <Route path="/vehicle-checkups" element={<VehicleCheckupPage />} />
          <Route path="/equipment-checkups" element={<EquipmentCheckupPage />} />
          <Route path="/mission-team-members" element={<MissionTeamMemberPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/ambulance" element={<AmbulancePage />} />

          {/* Fallback 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

const NotFound: React.FC = () => {
  return <div>Page Not Found</div>;
};

export default App;
