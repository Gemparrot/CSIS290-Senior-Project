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
    console.log("Payload before sending:", {
      vehicle_number: registerPayload.vehicle_number,
      password: registerPayload.password,
      adminId: registerPayload.adminId
    });

    const response = await axios.post('/ambulance/create', registerPayload);
    return response.data; 
  },

  getAmbulanceById: async (id: string) => {
    const response = await axios.get(`/ambulance/${id}`);
    return response.data;
  },

  getMyAmbulance: async () => {
    const response = await axios.get('/ambulance/me');
    return response.data;
  },

  //
  getAllAmbulances: async (adminId: number) => {
    const response = await axios.get(`/ambulance?adminId=${adminId}`);
    return response.data;
  },

  // Fetch an ambulance by its ID and associated admin ID
getAmbulanceByAdminId: async (id: number, adminId: number) => {
  const response = await axios.get(`/ambulance/${id}/admin/${adminId}`);
  return response.data;
},

// Update an ambulance's details
updateAmbulance: async (id: string, updatePayload: Partial<AmbulanceRegisterPayload>) => {
  const response = await axios.put(`/ambulance/${id}`, updatePayload);
  return response.data;
},

// Delete an ambulance
deleteAmbulance: async (id: string) => {
  const response = await axios.delete(`/ambulance/${id}`);
  return response.data;
},
};


export default ambulanceService;
