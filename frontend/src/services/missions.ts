import axios from '../utils/axiosConfig';

// Define the Mission API payloads
export interface MissionDto {
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

// Define the Mission response interface
export interface Mission extends MissionDto {
  id: number;
  created_at: Date;
  updated_at: Date;
}

const missionService = {
  // Create a new mission
  create: async (missionDto: MissionDto): Promise<Mission> => {
    const response = await axios.post<Mission>('/missions', missionDto);
    return response.data;
  },

  // Get all missions (admin access only)
  findAll: async (): Promise<Mission[]> => {
    const response = await axios.get<Mission[]>('/missions');
    return response.data;
  },

  // Get pending missions (ambulance-specific or all for admin)
  findPending: async (): Promise<Mission[]> => {
    const response = await axios.get<Mission[]>('/missions/pending');
    return response.data;
  },

  // Get a specific mission by ID
  findOne: async (id: number): Promise<Mission> => {
    const response = await axios.get<Mission>(`/missions/${id}`);
    return response.data;
  },

  // Update a specific mission by ID
  update: async (id: number, missionDto: MissionDto): Promise<Mission> => {
    const response = await axios.put<Mission>(`/missions/${id}`, missionDto);
    return response.data;
  },

  // Delete a specific mission by ID
  remove: async (id: number): Promise<Mission> => {
    const response = await axios.delete<Mission>(`/missions/${id}`);
    return response.data;
  },
};

export default missionService;