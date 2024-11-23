import axios from '../utils/axiosConfig';

// Define the Equipment Checkup API payloads
interface EquipmentCheckupDto {
  equipmentStatus: string; // Example field, replace with actual DTO properties
  notes?: string;
}

const equipmentCheckupService = {
  // Create a new equipment checkup
  createCheckup: async () => {
    const response = await axios.post('/equipment-checkups/checkup');
    return response.data;
  },

  // Get all equipment checkups for the logged-in ambulance
  findAll: async () => {
    const response = await axios.get('/equipment-checkups');
    return response.data;
  },

  // Get a specific equipment checkup by ID
  findOne: async (id: number) => {
    const response = await axios.get(`/equipment-checkups/${id}`);
    return response.data;
  },

  // Update a specific equipment checkup by ID
  update: async (id: number, updatePayload: EquipmentCheckupDto) => {
    const response = await axios.put(`/equipment-checkups/${id}`, updatePayload);
    return response.data;
  },

  // Delete a specific equipment checkup by ID
  remove: async (id: number) => {
    const response = await axios.delete(`/equipment-checkups/${id}`);
    return response.data;
  },
};

export default equipmentCheckupService;
