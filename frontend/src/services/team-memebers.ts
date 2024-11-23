import axios from '../utils/axiosConfig';

// Define the Team Member API payloads
interface TeamMemberDto {
  name?: string; // Optional field
}

const teamMemberService = {
  // Create a new team member
  create: async (teamMemberDto: TeamMemberDto) => {
    const response = await axios.post('/team-members', teamMemberDto);
    return response.data;
  },

  // Get all team members (admin access only)
  findAll: async () => {
    const response = await axios.get('/team-members');
    return response.data;
  },

  // Get a specific team member by ID (admin access only)
  findOne: async (id: number) => {
    const response = await axios.get(`/team-members/${id}`);
    return response.data;
  },

  // Update a specific team member by ID
  update: async (id: number, teamMemberDto: TeamMemberDto) => {
    const response = await axios.put(`/team-members/${id}`, teamMemberDto);
    return response.data;
  },

  // Delete a specific team member by ID
  remove: async (id: number) => {
    const response = await axios.delete(`/team-members/${id}`);
    return response.data;
  },
};

export default teamMemberService;
