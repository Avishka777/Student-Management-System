import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
  
  // Retrieve The Current User From The Redux Store
  const { currentUser } = useSelector((state) => state.user);
  
  // Render The Child Routes If The Current User Exists And Is An Admin, Otherwise Redirect To Sign-In Page
  return currentUser && currentUser.isAdmin ? (
    <Outlet /> // Render The Clild Routes
  ) : (
    <Navigate to='/sign-in' /> // Redirect To The Sign-In Page
  );
}
// This Component Represents a Private Route Accessible Only to Users With Admin Privileges.
// It Checks If The Current User Is Logged In And Has Admin Privileges Using Redux State.
// If The User Is An Admin, It Renders The Child Routes Using The Outlet Component.
// If The User Is Not Logged In Or Is Not An Admin, It Redirects To The Sign-In Page Using The Navigate Component.
