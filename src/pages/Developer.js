import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Developer = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      // Fetch forms from the API
      const fetchForms = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/forms', {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the header
            },
          });
          const developerForms = response.data.filter((form) => form.role === 'developer');
          setForms(developerForms);
        } catch (err) {
          setError('Error fetching forms');
        } finally {
          setLoading(false);
        }
      };

      fetchForms();
    }
  }, [navigate]);

  return (
    <div>
      <h1>Developer Page</h1>
      <Link to="/form">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Go to Form
        </button>
      </Link>
      {loading ? (
        <p>Loading forms...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <h2>Submitted Forms</h2>
          {forms.length > 0 ? (
            <ul>
              {forms.map((form, index) => (
                <li key={index}>
                  <strong>Title:</strong> {form.title} <br />
                  <strong>Content:</strong> {form.content} <br />
                  <strong>Role:</strong> {form.role}
                </li>
              ))}
            </ul>
          ) : (
            <p>No forms found for developers</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Developer;
