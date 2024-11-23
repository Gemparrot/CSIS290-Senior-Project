import axios from '../utils/axiosConfig';

interface CreatePCRDto {
  primary_assessment?: Record<string, any>;
  body_section?: Record<string, any>;
  vitals?: Record<string, any>;
  management?: Record<string, any>;
  clinical_info?: Record<string, any>;
  patient_details?: Record<string, any>;
}

const pcrService = {
  // Create a new PCR for a mission
  create: async (missionId: number, dto: CreatePCRDto) => {
    const response = await axios.post(`/missions/${missionId}/pcr`, dto);
    return response.data;
  },

  // Retrieve all PCRs for a specific mission
  findAll: async (missionId: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr`);
    return response.data;
  },

  // Retrieve a specific PCR by ID within a mission
  findOne: async (missionId: number, id: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr/${id}`);
    return response.data;
  },
};

export default pcrService;
