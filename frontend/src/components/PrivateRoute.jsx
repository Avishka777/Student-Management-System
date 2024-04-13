import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  // Retrieve The Current User From The Redux Store
  const { currentUser } = useSelector((state) => state.user);

  // Check If There Is A Current User, If Yes, Render The Child Components,
  // Otherwise, Navigate The User To The Sign-In Page
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
// This Component Serves As A Private Route Guard Throughout The Application.
// It Retrieves The Current User From The Redux Store Using The UseSelector Hook.
// If There Is A Current User, It Renders The Child Components Using The Outlet Component From React Router.
// If There Is No Current User, It Navigates The User To The Sign-In Page Using The Navigate Component From React Router.
