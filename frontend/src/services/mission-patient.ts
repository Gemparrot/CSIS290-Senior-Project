import axios from '../utils/axiosConfig';

interface Patient {
  id: number;
  missionId: number;
  patientName: string;
}

interface CreateMissionPatientDto {
  missionId: number;
  patientName: string;
}

interface UpdateMissionPatientDto {
  missionId?: number;
  patientName?: string;
}

const missionPatientService = {
  create: async (dto: CreateMissionPatientDto): Promise<Patient> => {
    const response = await axios.post('/mission-patients', dto);
    return response.data as Patient; 
  },

  findAll: async (): Promise<Patient[]> => {
    const response = await axios.get('/mission-patients');
    return response.data as Patient[];
  },

  findOne: async (id: number): Promise<Patient> => {
    const response = await axios.get(`/mission-patients/${id}`);
    return response.data as Patient;
  },

  findByMissionId: async (missionId: number): Promise<Patient[]> => {
    const response = await axios.get(`/mission-patients/mission/${missionId}`);
    return response.data as Patient[];
  },

  update: async (id: number, dto: UpdateMissionPatientDto): Promise<Patient> => {
    const response = await axios.patch(`/mission-patients/${id}`, dto);
    return response.data as Patient;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/mission-patients/${id}`);
  },
};

export default missionPatientService;
