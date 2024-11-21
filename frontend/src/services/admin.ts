import axios from '../utils/axiosConfig';

// Define the types for the Admin API payloads
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
  /**
   * Admin login API call
   * @param loginPayload - Contains email and password
   */
  login: async (loginPayload: AdminLoginPayload) => {
    const response = await axios.post('/admin/login', loginPayload);
    return response.data;
  },

  /**
   * Admin registration API call
   * @param registerPayload - Contains username, email, and password
   */
  register: async (registerPayload: AdminRegisterPayload) => {
    const response = await axios.post('/admin/register', registerPayload);
    return response.data;
  },
};

export default adminService;
