import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token,role } = response.data;  // JWT token received from backend
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      // Store token in local storage
      if (role === 'admin') {
        navigate('/dashboard');
      } else if (role === 'developer') {
        navigate('/developer');
      } else if (role === 'junior') {
        navigate('/junior');
      } else if (role === 'manager') {
        navigate('/manager');
      }
    } catch (err) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Link to="/">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Register
        </button>
      </Link>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
