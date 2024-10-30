import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Select Login</h2>
      <button onClick={() => navigate('/admin/login')}>Admin Login</button>
      <button onClick={() => navigate('/ambulance/login')}>Ambulance Login</button>
    </div>
  );
}

export default Login;
