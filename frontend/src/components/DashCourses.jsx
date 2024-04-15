import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Table, Button, Box, Typography,TableBody,TableCell,TableHead,TableRow } from '@mui/material';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashCourses() {

  const { currentUser } = useSelector((state) => state.user);
  const [userCourses, setUserCourses] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/course/getcourses?=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserCourses(data.courses);
          if (data.courses.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchCourses();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userCourses.length;
    try {
      const res = await fetch(
        `/api/course/getcourses?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserCourses((prev) => [...prev, ...data.courses]);
        if (data.courses.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteCourse = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/course/deletecourse/${courseIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserCourses((prev) =>
          prev.filter((course) => course._id !== courseIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '100%', padding: '2rem' }}>
      {currentUser.isAdmin && userCourses.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableCell style={{fontWeight:'600'}}>COURSE ID</TableCell>
              <TableCell style={{fontWeight:'600'}}>COURSE NAME</TableCell>
              <TableCell style={{fontWeight:'600'}}>PRICE</TableCell>
              <TableCell style={{fontWeight:'600'}}>ASSIGNED TEACHER</TableCell>
              <TableCell style={{fontWeight:'600'}}>DELETE</TableCell>
              <TableCell style={{fontWeight:'600'}}>EDIT</TableCell>
            </TableHead>
            {userCourses.map((course) => (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link
                      to={`/course/${course.slug}`}
                      style={{textDecoration:'none', color:'black'}}
                    >
                      {course.courseCode}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/course/${course.slug}`}
                      style={{textDecoration:'none', color:'black'}}
                    >
                      {course.courseName}
                    </Link>
                  </TableCell>
                  <TableCell>{course.coursePrice}</TableCell>
                  <TableCell>{course.enrolledTeacher}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setShowModal(true);
                        setCourseIdToDelete(course._id);
                      }}
                      color='error'
                      variant='outlined'
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/update-course/${course._id}`}
                    >
                      <Button variant='outlined'>Edit</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <Button onClick={handleShowMore} color='primary' variant='outlined' >
              Show more
            </Button>
          )}
        </>
      ) : (
        <Typography variant="body1">You Have No Courses Yet!</Typography>
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{ textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', padding: '6rem', margin: '20rem' }}>
          <HiOutlineExclamationCircle sx={{ height: '3rem', width: '3rem', color: '#718096', marginBottom: '1rem' }} />
          <Typography variant='h6' sx={{ marginBottom: '1rem' }}>Are You Sure You Want To Delete This Course?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button variant='contained' color='error' onClick={handleDeleteCourse}>Yes, I'm Sure</Button>
            <Button variant='contained' onClick={() => setShowModal(false)}>No, Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
