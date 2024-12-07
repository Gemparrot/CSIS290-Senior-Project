import axios from '../utils/axiosConfig';

interface CreatePCRDto {
  primary_assessment?: Record<string, any>;
  body_section?: Record<string, any>;
  vitals?: Record<string, any>;
  management?: Record<string, any>;
  clinical_info?: Record<string, any>;
  patient_details?: Record<string, any>;
  missionId?: number; 
  patientId?: number;  
}

interface UpdatePCRDto extends Partial<CreatePCRDto> {}

const pcrService = {
  create: async (missionId: number, patientId: number, dto: CreatePCRDto) => {
    const response = await axios.post(`/missions/${missionId}/pcr`, {
      ...dto,
      missionId, 
      patientId,
    });
    return response.data;
  },

  findAll: async (missionId: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr`);
    console.log("PCR", response);
    return response.data;
  },

  findOne: async (missionId: number, id: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr/${id}`);
    return response.data;
  },

  update: async (missionId: number, id: number, dto: UpdatePCRDto) => {
    const response = await axios.put(`/missions/${missionId}/pcr/${id}`, dto); 
    return response.data;
  },

  getPCRidByPatient: async (missionId: number, patientId: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr/patient/${patientId}`);
    return response.data; 
  },
};

export default pcrService;
