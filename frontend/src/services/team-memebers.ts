import axios from '../utils/axiosConfig';

interface TeamMemberDto {
  name?: string; 
}

const teamMemberService = {
  create: async (teamMemberDto: TeamMemberDto) => {
    const response = await axios.post('/team-members', teamMemberDto);
    return response.data;
  },

  findAll: async () => {
    const response = await axios.get('/team-members');
    return response.data;
  },

  findOne: async (id: number) => {
    const response = await axios.get(`/team-members/${id}`);
    return response.data;
  },

  update: async (id: number, teamMemberDto: TeamMemberDto) => {
    const response = await axios.put(`/team-members/${id}`, teamMemberDto);
    return response.data;
  },

  remove: async (id: number) => {
    const response = await axios.delete(`/team-members/${id}`);
    return response.data;
  },
};

export default teamMemberService;
