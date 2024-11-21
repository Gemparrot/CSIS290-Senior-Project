import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/admin';
import ambulanceService from '../services/ambulance'; 

const LoginPage: React.FC = () => {
  const [emailOrVehicleNumber, setEmailOrVehicleNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      let response: { token: string };

      const isEmail = /\S+@\S+\.\S+/.test(emailOrVehicleNumber);

      if (isEmail) {
        // Admin login
        response = await adminService.login({ email: emailOrVehicleNumber, password }) as { token: string };
      } else {
        // Ambulance login
        response = await ambulanceService.login({ vehicle_number: emailOrVehicleNumber, password }) as { token: string };
      }

      localStorage.setItem('token', response.token); 

      
      if (isEmail) {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/ambulance/homepage'); 
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="emailOrVehicleNumber" className="block text-sm font-medium text-gray-700">
            Email or Vehicle Number
          </label>
          <input
            id="emailOrVehicleNumber"
            type="text"
            value={emailOrVehicleNumber}
            onChange={(e) => setEmailOrVehicleNumber(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
