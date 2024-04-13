import { useState } from 'react';
import { Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  // State Variables
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user); // Redux Selector For Loading State And Error Message
  const dispatch = useDispatch(); // Redux Dispatch Function
  const navigate = useNavigate(); // Navigation Hook

  // Function To Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Function To Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please Fill All The Fields.')); // Dispatch Failure Action If Fields Are Empty
    }
    try {
      dispatch(signInStart()); // Dispatch Start Action
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Dispatch Failure Action If Sign-In Fails
      }
      if (res.ok) {
        dispatch(signInSuccess(data)); // Dispatch Success Action If Sign-In Succeeds
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message)); // Dispatch Failure Action If An Error Occurs
    }
  };

  return (
    <div style={{ marginBottom: '4rem' , marginTop: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ minWidth: '50rem' }}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary">SIGN IN</Typography>
            <hr style={{ margin: '1rem 0', border: 'none', borderBottom: '1px solid #ccc' }} />
          </div>
          {/* Sign-In Form */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
            <label>Email</label>
            <TextField
              type='email'
              label='Your Email'
              placeholder='reg.no@uni.lk'
              id='email'
              onChange={handleChange}
              variant="outlined"
            />
            <label>Password</label>
            <TextField
              type='password'
              placeholder='**********'
              id='password'
              onChange={handleChange}
              variant="outlined"
            />
            {/* Sign-In Button */}
            <Button
              variant="contained"
              color="primary"
              type='submit'
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} />
                  <span style={{ marginLeft: '0.5rem' }}>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
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
