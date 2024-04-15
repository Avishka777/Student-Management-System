import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableRow, TableCell, Typography, Button, Modal,TableHead ,TableBody,Box } from '@mui/material';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ width: '100%', padding: '2rem' }}>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:'600'}}>DATE CREATED</TableCell>
                <TableCell style={{fontWeight:'600'}}>IMAGE</TableCell>
                <TableCell style={{fontWeight:'600'}}>NAME</TableCell>
                <TableCell style={{fontWeight:'600'}}>EMAIL</TableCell>
                <TableCell style={{fontWeight:'600'}}>ADMIN</TableCell>
                <TableCell style={{fontWeight:'600'}}>TEACHER</TableCell>
                <TableCell style={{fontWeight:'600'}}>STUDENT</TableCell>
                <TableCell style={{fontWeight:'600'}}>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role === 'Admin' ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</TableCell>
                  <TableCell>{user.role === 'Teacher' ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</TableCell>
                  <TableCell>{user.role === 'Student' ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</TableCell>
                  <TableCell>
                    <Button onClick={() => { setShowModal(true); setUserIdToDelete(user._id); }} style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (
            <Button onClick={handleShowMore} style={{ width: '100%', color: 'teal', alignSelf: 'center', fontSize: '0.875rem', paddingTop: '1.75rem' }}>Show more</Button>
          )}
        </>
      ) : (
        <Typography variant='body1'>You have no users yet!</Typography>
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', padding: '6rem' , margin:'20rem' }}>
          <HiOutlineExclamationCircle sx={{ height: '3rem', width: '3rem', color: '#718096', marginBottom: '1rem' }} />
          <Typography variant='h6' sx={{ marginBottom: '1rem' }}>Are You Sure You Want To Delete This User?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button variant='contained' color='error' onClick={handleDeleteUser}>Yes, I'm Sure</Button>
            <Button variant='contained' onClick={() => setShowModal(false)}>No, Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
