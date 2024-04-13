import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { HiUser, HiLogout, HiOutlineUserGroup, HiChartBar, HiOutlineAcademicCap } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

const drawerWidth = 240;

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  // Update Active Tab Based On URL Change
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // Function To Handle User Signout
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
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          background:"#2074d4"
        },
      }}
    >
      <PerfectScrollbar>
        <List style={{ marginTop:'60px' }}>
          {/* Profile Link */}
          <Link to='/dashboard?tab=profile' style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button selected={tab === 'profile'}>
              <ListItemIcon sx={{ fontSize: 25 }}>
                <HiUser />
              </ListItemIcon>
              <ListItemText primary={currentUser.isAdmin ? 'Admin' : 'User'} />
            </ListItem>
          </Link>

          {/* Dashboard Link */}
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button selected={tab === 'dash' || !tab}>
                <ListItemIcon sx={{ fontSize: 25 }}>
                  <HiChartBar />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
          )}

          {/* Users Link */}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button selected={tab === 'users'}>
                <ListItemIcon sx={{ fontSize: 25 }}>
                  <HiOutlineUserGroup />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>
          )}

          {/* Courses Link */}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=courses' style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button selected={tab === 'courses'}>
                <ListItemIcon sx={{ fontSize: 25 }}>
                  <HiOutlineAcademicCap />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItem>
            </Link>
          )}

          {/* Sign Out Button */}
          <ListItem button onClick={handleSignout}>
            <ListItemIcon sx={{ fontSize: 25 }}>
              <HiLogout />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </PerfectScrollbar>
    </Drawer>
  );
}
