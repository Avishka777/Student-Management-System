import { useState } from 'react';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  // State Variables
  const [formData, setFormData] = useState({}); // Form Data State
  const [errorMessage, setErrorMessage] = useState(null); // Error Message State
  const [loading, setLoading] = useState(false); // Loading State
  const navigate = useNavigate(); // Navigation Hook

  // Function To Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function To Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check If Required Fields Are Filled Out
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      // Send Form Data To Server
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // Handle Response From Server
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      // If Account Creation Is Successful, Navigate To Dashboard
      if (res.ok) {
        navigate('/dashboard?tab=users');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '4rem', marginTop: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ minWidth: '50rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1>SIGN UP</h1>
            <hr style={{ margin: '1rem 0', border: 'none', borderBottom: '1px solid #ccc' }} />
          </div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
            <label>User Name</label>
            <TextField
              type='text'
              placeholder='Enter User Name'
              id='username'
              onChange={handleChange}
            />
            <label>Email</label>
            <TextField
              type='email'
              placeholder='Enter Valid Email'
              id='email'
              onChange={handleChange}
            />
            <label>Password</label>
            <TextField
              type='password'
              placeholder='Enter Strong Password'
              id='password'
              onChange={handleChange}
            />
            <label>Your Role</label>
            <TextField
              type='text'
              placeholder='Teacher / Student'
              id='role'
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} />
                  <span style={{ marginLeft: '0.5rem' }}>Loading...</span>
                </>
              ) : ('SIGN UP')}
            </Button>
            <Button
              variant="contained"
              type='submit'
              disabled={loading}
              href='\sign-in'
              style={{backgroundColor:'#Cb136d', marginTop: '0.5rem'}}
            >
              Sign In
          </Button>
          </form>
          {/* Display Error Message If Present */}
          {errorMessage && (
            <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>{errorMessage}</Typography>
          )}
        </div>
      </div>
    </div>
  );
}
