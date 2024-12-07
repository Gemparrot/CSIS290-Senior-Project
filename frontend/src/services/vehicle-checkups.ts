import axios from '../utils/axiosConfig';

interface VehicleCheckupDto {
  ambulanceId?: number;
  is_checked: 'checked' | 'unchecked'; 
}

const vehicleCheckupService = {
  createCheckup: async () => {
    const response = await axios.post('/vehicle-checkups/checkup');
    return response.data;
  },

  findAll: async () => {
    const response = await axios.get('/vehicle-checkups');
    return response.data;
  },

  findOne: async (id: number) => {
    const response = await axios.get(`/vehicle-checkups/${id}`);
    return response.data;
  },

  update: async (id: number, vehicleCheckupDto: VehicleCheckupDto) => {
    const response = await axios.put(`/vehicle-checkups/${id}`, vehicleCheckupDto);
    return response.data;
  },

  remove: async (id: number) => {
    const response = await axios.delete(`/vehicle-checkups/${id}`);
    return response.data;
  },
};

export default vehicleCheckupService;
