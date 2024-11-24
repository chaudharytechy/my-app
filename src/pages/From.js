import React, { useState, useEffect } from 'react';
import axios from 'axios';

const From = () => {
  const [role, setRole] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Set the role from localStorage
    } else {
      setError('Role not found in localStorage');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || !title || !content || !submittedBy) {
      setError('All fields are required!');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the token for authorization
      const response = await axios.post(
        'http://localhost:5000/api/forms', 
        {
          title,
          content,
          role,
          submittedBy
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the request header
          }
        }
      );
      
      setSuccess('Form submitted successfully!');
      setTitle('');
      setContent('');
      setSubmittedBy('')
    } catch (err) {
      setError('Error submitting form');
    }
  };

  return (
    <div>
      <h2>Submit Appraisal Form</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>submittedBy: </label>
          <input 
            type="text" 
            value={submittedBy} 
            onChange={(e) =>setSubmittedBy(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label>Title: </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label>Content: </label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Enter content"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default From;
