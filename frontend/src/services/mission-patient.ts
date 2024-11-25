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
  // Create a mission patient record
  create: async (dto: CreateMissionPatientDto): Promise<Patient> => {
    const response = await axios.post('/mission-patients', dto);
    return response.data as Patient; // Ensure the type is explicitly Patient
  },

  // Get all mission patient records
  findAll: async (): Promise<Patient[]> => {
    const response = await axios.get('/mission-patients');
    return response.data as Patient[];
  },

  // Get a specific mission patient record by ID
  findOne: async (id: number): Promise<Patient> => {
    const response = await axios.get(`/mission-patients/${id}`);
    return response.data as Patient;
  },

  // Get mission patient records by mission ID
  findByMissionId: async (missionId: number): Promise<Patient[]> => {
    const response = await axios.get(`/mission-patients/mission/${missionId}`);
    return response.data as Patient[];
  },

  // Update a mission patient record
  update: async (id: number, dto: UpdateMissionPatientDto): Promise<Patient> => {
    const response = await axios.patch(`/mission-patients/${id}`, dto);
    return response.data as Patient;
  },

  // Delete a mission patient record
  delete: async (id: number): Promise<void> => {
    await axios.delete(`/mission-patients/${id}`);
  },
};

export default missionPatientService;
