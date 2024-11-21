import axios from '../utils/axiosConfig';

// Define the Ambulance API payloads

interface AmbulanceLoginPayload {
  vehicle_number: string;
  password: string;
}

interface AmbulanceRegisterPayload {
  vehicle_number: string;
  password: string;
  adminId: number; 
}

const ambulanceService = {
  
  login: async (loginPayload: AmbulanceLoginPayload) => {
    console.log("Ambulance Login Payload:", loginPayload); 
    const response = await axios.post('/ambulance/login', loginPayload);
    return response.data; 
  },

  register: async (registerPayload: AmbulanceRegisterPayload) => {
    const response = await axios.post('/ambulance/create', registerPayload);
    return response.data; 
  },
};

export default ambulanceService;
