import axios from '../utils/axiosConfig';

type Role = 'missionLeader' | 'driver' | 'emt1' | 'emt2' | 'emt3';

interface CreateMissionTeamMemberDto {
  missionId: number;
  teamMemberId: number;
  role: Role;
}

interface UpdateMissionTeamMemberDto {
  missionId?: number;
  teamMemberId?: number;
  role?: Role;
}

const missionTeamMemberService = {
  create: async (dto: CreateMissionTeamMemberDto) => {
    const response = await axios.post('/mission-team-members', dto);
    return response.data;
  },

  findAll: async () => {
    const response = await axios.get('/mission-team-members');
    return response.data;
  },

  findOne: async (id: number) => {
    const response = await axios.get(`/mission-team-members/${id}`);
    return response.data;
  },

  findByMissionId: async (missionId: number) => {
    const response = await axios.get(`/mission-team-members/mission/${missionId}`);
    return response.data;
  },

  update: async (id: number, dto: UpdateMissionTeamMemberDto) => {
    const response = await axios.patch(`/mission-team-members/${id}`, dto);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(`/mission-team-members/${id}`);
    return response.data;
  }
};

export default missionTeamMemberService;