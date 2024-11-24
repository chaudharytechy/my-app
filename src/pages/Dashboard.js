import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      // Fetch forms for the admin role
      const fetchForms = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/forms', {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token for authentication
            },
          });

          // Filter forms by role "admin"
        
          setForms(response.data);
        } catch (err) {
          setError('Failed to fetch forms');
        } finally {
          setLoading(false);
        }
      };

      fetchForms();
    }
  }, [navigate]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : forms.length > 0 ? (
        <div>
          {forms.map((form) => (
            <div key={form._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{form.title}</h3>
              <p>{form.content}</p>
              <p><strong>Role:</strong> {form.role}</p>
              <p><strong>Submitted By:</strong> {form.submittedBy}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forms available for the admin role</p>
      )}
    </div>
  );
};

export default Dashboard;
