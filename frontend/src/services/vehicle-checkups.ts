import axios from '../utils/axiosConfig';

// Define the Vehicle Checkup API payloads
interface VehicleCheckupDto {
  ambulanceId?: number; // Optional field for identifying ambulances
  is_checked: 'checked' | 'unchecked'; // Enum for checkup status
}

const vehicleCheckupService = {
  // Create a new vehicle checkup
  createCheckup: async () => {
    const response = await axios.post('/vehicle-checkups/checkup');
    return response.data;
  },

  // Get all vehicle checkups for the current ambulance
  findAll: async () => {
    const response = await axios.get('/vehicle-checkups');
    return response.data;
  },

  // Get details of a specific vehicle checkup by ID
  findOne: async (id: number) => {
    const response = await axios.get(`/vehicle-checkups/${id}`);
    return response.data;
  },

  // Update a specific vehicle checkup by ID
  update: async (id: number, vehicleCheckupDto: VehicleCheckupDto) => {
    const response = await axios.put(`/vehicle-checkups/${id}`, vehicleCheckupDto);
    return response.data;
  },

  // Delete a specific vehicle checkup by ID
  remove: async (id: number) => {
    const response = await axios.delete(`/vehicle-checkups/${id}`);
    return response.data;
  },
};

export default vehicleCheckupService;
