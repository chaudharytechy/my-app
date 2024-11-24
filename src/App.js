import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Developer from './pages/Developer';
import Manager from './pages/Manager';
import Junior from './pages/Junior';
import From from './pages/From';
import { First } from './personal/First';

const ProtectedRoute = ({ children, allowedRoles, currentRole }) => {
  return allowedRoles.includes(currentRole) ? children : <h1>Unauthorized</h1>;
};

function App() {
  const currentRole = "manager"; // Simulate current user role

  return (
    <Router>
      {/* <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/developer' element={<Developer/>}/>
        <Route path='/manager' element={<Manager/>}/>
        <Route path='/junior' element={<Junior/>}/>
        <Route path='/form' element={<From/>}/>

      </Routes> */}
      <Routes>
        <Route path='/'  element={<First/>}/>
      </Routes>
    </Router>
  );
}

export default App;
