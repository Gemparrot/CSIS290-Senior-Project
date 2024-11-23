import axios from '../utils/axiosConfig';

// Define DTO structures
interface CreateMissionTeamMemberDto {
  missionId: number;
  driverId?: number;
  missionLeaderId?: number;
  emt1Id?: number;
  emt2Id?: number;
  emt3Id?: number;
}

interface UpdateMissionTeamMemberDto {
  driverId?: number;
  missionLeaderId?: number;
  emt1Id?: number;
  emt2Id?: number;
  emt3Id?: number;
}

const missionTeamMemberService = {
  // Create a mission team member assignment
  create: async (dto: CreateMissionTeamMemberDto) => {
    const response = await axios.post('/mission-team-members', dto);
    return response.data;
  },

  // Get all mission team member assignments
  findAll: async () => {
    const response = await axios.get('/mission-team-members');
    return response.data;
  },

  // Get a specific mission team member assignment by ID
  findOne: async (id: number) => {
    const response = await axios.get(`/mission-team-members/${id}`);
    return response.data;
  },

  // Update a specific mission team member assignment by ID
  update: async (id: number, dto: UpdateMissionTeamMemberDto) => {
    const response = await axios.patch(`/mission-team-members/${id}`, dto);
    return response.data;
  },

  // Delete a specific mission team member assignment by ID
  remove: async (id: number) => {
    const response = await axios.delete(`/mission-team-members/${id}`);
    return response.data;
  },
};

export default missionTeamMemberService;
