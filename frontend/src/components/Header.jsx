import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import AppBar from '@mui/material/AppBar';
import logo from '../assets/logo.png';
import { Toolbar, Typography, InputBase, IconButton, Avatar, Menu, MenuItem, Button } from '@mui/material'; 

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Update Search Term State When URL Search Parameter Changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Handle User Sign Out
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle Search Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <AppBar style={{ height: 65, position:"static", marginBottom:'30px'  }}>
      <Toolbar>
        
        {/* Logo and Title */}
        <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="PHOENIX LOGO" style={{ height: 40, marginRight: 10}} />
          <Typography variant="h6" sx={{ fontWeight: '600', color: '#fff'}}>
            PHOENIX INSTITUTE
          </Typography>
        </RouterLink>

        {/* Navigation */}
        <div style={{ marginLeft: '80px', color: '#fff' }}>
          <RouterLink to='/' style={{ marginLeft: '20px' , color: '#fff',textDecoration: 'none' }}>Home</RouterLink>
          <RouterLink to='/courses' style={{ marginLeft: '20px' , color: '#fff',textDecoration: 'none' }}>Courses</RouterLink>
          <RouterLink to='/about' style={{ marginLeft: '20px' , color: '#fff',textDecoration: 'none' }}>About</RouterLink>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} style={{ marginLeft: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <InputBase
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: 5, borderColor: '#fff', color: '#fff', borderWidth: 1, borderStyle: 'solid',borderRadius: '10px' }}
            />
          </div>
        </form>


        {/* User Profile Dropdown */}
        <div style={{ marginLeft: '60px' }}>
          {currentUser ? (
            <div>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar alt='user' src={currentUser.profilePicture} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>
                  <Typography variant="body2">@{currentUser.username}</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography variant="body2">{currentUser.email}</Typography>
                </MenuItem>
                <MenuItem>
                  <RouterLink to='/dashboard?tab=profile' style={{ color: '#000',textDecoration: 'none' }}>Dashboard</RouterLink>
                </MenuItem>
                <MenuItem onClick={handleSignout}>Sign out</MenuItem>
              </Menu>
            </div>
          ) : (
            <RouterLink to='/sign-in'>
              <Button style={{ color: 'black', border: '1px solid black' }}>Sign In</Button>
            </RouterLink>
          )}
        </div>

        
      </Toolbar>
    </AppBar>
  );
}
