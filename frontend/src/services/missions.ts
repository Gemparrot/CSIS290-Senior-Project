import axios from '../utils/axiosConfig';

export interface MissionDto {
  mission_type: 'emergency' | 'transportation';
  description: string;
  address: string;
  ambulanceId?: number; 
  status?: 'pending' | 'active' | 'completed' | 'canceled';
  images?: any; 
  patient_count?: number; 
  canceled_at?: Date; 
  completed_at?: Date; 
}

export interface Mission extends MissionDto {
  id: number;
  created_at: Date;
  updated_at: Date;
}

const missionService = {
  create: async (missionDto: MissionDto): Promise<Mission> => {
    const response = await axios.post<Mission>('/missions', missionDto);
    return response.data;
  },

  findAll: async (): Promise<Mission[]> => {
    const response = await axios.get<Mission[]>('/missions');
    return response.data;
  },

  findPending: async (): Promise<Mission[]> => {
    const response = await axios.get<Mission[]>('/missions/pending');
    return response.data;
  },

  findOne: async (id: number): Promise<Mission> => {
    const response = await axios.get<Mission>(`/missions/${id}`);
    return response.data;
  },

  update: async (id: number, missionDto: MissionDto): Promise<Mission> => {
    const response = await axios.put<Mission>(`/missions/${id}`, missionDto);
    return response.data;
  },

  remove: async (id: number): Promise<Mission> => {
    const response = await axios.delete<Mission>(`/missions/${id}`);
    return response.data;
  },

  findAllForAmbulance: async (ambulanceId: number): Promise<Mission[]> => {
    const response = await axios.get<Mission[]>(`/missions/ambulance/${ambulanceId}`);
    return response.data;
  },
};  

export default missionService;