import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { styled } from '@mui/system';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { HiUser, HiLogout, HiOutlineUserGroup, HiChartBar, HiOutlineAcademicCap } from 'react-icons/hi';

const SidebarWrapper = styled('div')({
  width: '100%',
  '@media (min-width: 768px)': {
    width: '240px',
  },
});

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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

  return (
    <SidebarWrapper>
      <ListItem button component={Link} to='/dashboard?tab=profile' selected={tab === 'profile'}>
        <ListItemIcon sx={{ fontSize: 24 }}>
          <HiUser />
        </ListItemIcon>
        <ListItemText primary={currentUser.isAdmin ? 'Admin' : 'User'}>Profile</ListItemText>
      </ListItem>

      {currentUser && currentUser.isAdmin && (
        <ListItem button component={Link} to='/dashboard?tab=dash' selected={tab === 'dash' || !tab}>
          <ListItemIcon sx={{ fontSize: 24 }}>
            <HiChartBar />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      )}

      {currentUser.isAdmin && (
        <ListItem button component={Link} to='/dashboard?tab=users' selected={tab === 'users'}>
          <ListItemIcon sx={{ fontSize: 24 }}>
            <HiOutlineUserGroup />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      )}

      {currentUser.isAdmin && (
        <ListItem button component={Link} to='/dashboard?tab=courses' selected={tab === 'courses'}>
          <ListItemIcon sx={{ fontSize: 24 }}>
            <HiOutlineAcademicCap />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
      )}

      <ListItem button onClick={handleSignout}>
        <ListItemIcon sx={{ fontSize: 24 }}>
          <HiLogout />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </SidebarWrapper>
  );
}
