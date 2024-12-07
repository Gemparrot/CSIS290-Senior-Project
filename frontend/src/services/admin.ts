import axios from '../utils/axiosConfig';

interface AdminLoginPayload {
  email: string;
  password: string;
}

interface AdminRegisterPayload {
  username: string;
  email: string;
  password: string;
}

const adminService = {
  
  login: async (loginPayload: AdminLoginPayload) => {
    const response = await axios.post('/admin/login', loginPayload);
    return response.data;
  },

  register: async (registerPayload: AdminRegisterPayload) => {
    const response = await axios.post('/admin/register', registerPayload);
    return response.data;
  },
};

export default adminService;
