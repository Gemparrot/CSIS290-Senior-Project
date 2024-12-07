import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      let response: { accessToken: string };

      const isEmail = /\S+@\S+\.\S+/.test(emailOrVehicleNumber);
      console.log("Email", isEmail)
      if (isEmail) {
        response = await adminService.login({ email: emailOrVehicleNumber, password }) as { accessToken: string };
        console.log("admin token", response) 
        console.log('Admin Token:', response.accessToken); 
         
      } else {
        response = await ambulanceService.login({ vehicle_number: emailOrVehicleNumber, password }) as { accessToken: string };
        console.log('Ambulance Response:', response); 
        console.log('Ambulance Token:', response.accessToken);

      }

  if (response && response.accessToken) {
    console.log("token exist", response)

    localStorage.setItem('token', response.accessToken);
    console.log('Token stored:', localStorage.getItem('token'));

    if (isEmail) {
      navigate('/admin/dashboard');
    } else {
      navigate('/ambulance/homepage');
    }
  } else {
    throw new Error('No token received from server');
  }
} catch (err: any) {
  console.error('Login error:', err); 
  setError(err.response?.data?.message || 'Login failed');
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>
  
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div>
              <label 
                htmlFor="emailOrVehicleNumber" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email or Vehicle Number
              </label>
              <input
                id="emailOrVehicleNumber"
                type="text"
                value={emailOrVehicleNumber}
                onChange={(e) => setEmailOrVehicleNumber(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
  
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
          </div>
  
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
  
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="text-center mt-4">
        <p className="text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800">Register HQ</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
