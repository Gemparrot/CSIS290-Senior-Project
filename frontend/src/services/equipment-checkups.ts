import axios from '../utils/axiosConfig';

interface EquipmentCheckupDto {
  equipmentStatus: string; 
  notes?: string;
}

const equipmentCheckupService = {
  createCheckup: async () => {
    const response = await axios.post('/equipment-checkups/checkup');
    return response.data;
  },

  findAll: async () => {
    const response = await axios.get('/equipment-checkups');
    return response.data;
  },

  findOne: async (id: number) => {
    const response = await axios.get(`/equipment-checkups/${id}`);
    return response.data;
  },

  update: async (id: number, updatePayload: EquipmentCheckupDto) => {
    const response = await axios.put(`/equipment-checkups/${id}`, updatePayload);
    return response.data;
  },

  remove: async (id: number) => {
    const response = await axios.delete(`/equipment-checkups/${id}`);
    return response.data;
  },
};

export default equipmentCheckupService;
