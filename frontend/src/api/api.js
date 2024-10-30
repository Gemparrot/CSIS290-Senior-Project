import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.status === 200;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const registerAmbulance = async (ambulanceData) => {
  try {
    await axios.post(`${API_BASE_URL}/ambulances`, ambulanceData);
  } catch (error) {
    console.error('Failed to register ambulance:', error);
  }
};

export const createTeamMember = async (teamMemberData) => {
    try {
      await axios.post(`${API_BASE_URL}/team-members`, teamMemberData);
    } catch (error) {
      console.error('Failed to create team member:', error);
    }
  };
  
  export const getAmbulances = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ambulances`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch ambulances:', error);
      return [];
    }
  };
  
  export const getPendingMissions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/missions/pending`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch pending missions:', error);
      return [];
    }
  };
  
  export const submitPCR = async (pcrData) => {
    try {
      await axios.post(`${API_BASE_URL}/pcrs`, pcrData);
    } catch (error) {
      console.error('Failed to submit PCR:', error);
    }
  };  

  export const getMissionDetails = async (missionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/missions/${missionId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch mission details:', error);
      return null;
    }
  };
  
  export const updateMission = async (missionId, missionData) => {
    try {
      await axios.put(`${API_BASE_URL}/missions/${missionId}`, missionData);
    } catch (error) {
      console.error('Failed to update mission:', error);
    }
  };
  
  export const uploadMedia = async (missionId, media) => {
    try {
      await axios.post(`${API_BASE_URL}/missions/${missionId}/media`, media, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error('Failed to upload media:', error);
    }
  };
  
  export const getAmbulanceDetails = async (ambulanceId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ambulances/${ambulanceId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch ambulance details:', error);
      return null;
    }
  };
  
  export const updateAmbulance = async (ambulanceId, ambulanceData) => {
    try {
      await axios.put(`${API_BASE_URL}/ambulances/${ambulanceId}`, ambulanceData);
    } catch (error) {
      console.error('Failed to update ambulance:', error);
    }
  };
  
  export const getTeamMemberDetails = async (teamMemberId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/team-members/${teamMemberId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch team member details:', error);
      return null;
    }
  };
  
  export const updateTeamMember = async (teamMemberId, teamMemberData) => {
    try {
      await axios.put(`${API_BASE_URL}/team-members/${teamMemberId}`, teamMemberData);
    } catch (error) {
      console.error('Failed to update team member:', error);
    }
  };
  
  export const getTeamMembers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/team-members`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch team members:', error);
      return [];
    }
  };
  
  export const recordTimestamp = async (timestampData) => {
    try {
      await axios.post(`${API_BASE_URL}/timestamps`, timestampData);
    } catch (error) {
      console.error('Failed to record timestamp:', error);
    }
  };  
