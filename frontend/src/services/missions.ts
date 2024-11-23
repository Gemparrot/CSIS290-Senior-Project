import axios from '../utils/axiosConfig';

// Define the Mission API payloads
interface MissionDto {
  mission_type: 'emergency' | 'transportation';
  description: string;
  address: string;
  ambulanceId?: number; // Optional field
  status?: 'pending' | 'active' | 'completed' | 'canceled'; // Optional field
  images?: any; // Optional JSON field
  patient_count?: number; // Optional field
  canceled_at?: Date; // Optional field
  completed_at?: Date; // Optional field
}

const missionService = {
  // Create a new mission
  create: async (missionDto: MissionDto) => {
    const response = await axios.post('/missions', missionDto);
    return response.data;
  },

  // Get all missions (admin access only)
  findAll: async () => {
    const response = await axios.get('/missions');
    return response.data;
  },

  // Get pending missions (ambulance-specific or all for admin)
  findPending: async () => {
    const response = await axios.get('/missions/pending');
    return response.data;
  },

  // Get a specific mission by ID
  findOne: async (id: number) => {
    const response = await axios.get(`/missions/${id}`);
    return response.data;
  },

  // Update a specific mission by ID
  update: async (id: number, missionDto: MissionDto) => {
    const response = await axios.put(`/missions/${id}`, missionDto);
    return response.data;
  },

  // Delete a specific mission by ID
  remove: async (id: number) => {
    const response = await axios.delete(`/missions/${id}`);
    return response.data;
  },
};

export default missionService;
