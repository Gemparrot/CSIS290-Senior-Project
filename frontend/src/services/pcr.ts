import axios from '../utils/axiosConfig';

interface CreatePCRDto {
  primary_assessment?: Record<string, any>;
  body_section?: Record<string, any>;
  vitals?: Record<string, any>;
  management?: Record<string, any>;
  clinical_info?: Record<string, any>;
  patient_details?: Record<string, any>;
  missionId?: number;  // Added missionId for consistency with the backend DTO
  patientId?: number;  // Added patientId for consistency with the backend DTO
}

interface UpdatePCRDto extends Partial<CreatePCRDto> {}

const pcrService = {
  // Create a new PCR for a mission
  create: async (missionId: number, patientId: number, dto: CreatePCRDto) => {
    // Include missionId and patientId in the request body to align with the backend DTO
    const response = await axios.post(`/missions/${missionId}/pcr`, {
      ...dto,
      missionId, // Add missionId
      patientId, // Add patientId
    });
    return response.data;
  },

  // Retrieve all PCRs for a specific mission
  findAll: async (missionId: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr`);
    console.log("PCR", response);
    return response.data;
  },

  // Retrieve a specific PCR by ID within a mission
  findOne: async (missionId: number, id: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr/${id}`);
    return response.data;
  },

  // Update a specific PCR by ID within a mission
  update: async (missionId: number, id: number, dto: UpdatePCRDto) => {
    const response = await axios.put(`/missions/${missionId}/pcr/${id}`, dto); // Use PUT for updating the entire entity
    return response.data;
  },

  // Get PCR ID by patient ID and mission ID
  getPCRidByPatient: async (missionId: number, patientId: number) => {
    const response = await axios.get(`/missions/${missionId}/pcr/patient/${patientId}`);
    return response.data; // Returns the PCR ID
  },
};

export default pcrService;
