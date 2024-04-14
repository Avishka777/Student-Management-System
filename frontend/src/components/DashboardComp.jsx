import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup, HiOutlineAcademicCap } from 'react-icons/hi';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]); // State Variable For Storing Users Data
  const [totalUsers, setTotalUsers] = useState(0); // State Variable For storing Total Number Of Users
  const [lastMonthUsers, setLastMonthUsers] = useState(0); // State Variable For Storing Number Of Users From Last Month
  const { currentUser } = useSelector((state) => state.user); // Getting Current User From Redux Store
  const [lastMonthCourses, setLastMonthCourses] = useState(0); // State Variable For Storing Number Of Courses From Last Month
  const [totalCourses, setTotalCourses] = useState(0); // State Variable For Storing Total Number Of Courses
  const [courses, setCourses] = useState([]); // State Variable For Storing Courses Data

  useEffect(() => {
    // Function To Fetch Users Data
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchCourses();
    }
  }, [currentUser]);

  // Function To Fetch Courses Data
  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/course/getcourses?limit=7');
      const data = await res.json();
      if (res.ok) {
        setCourses(data.courses);
        setTotalCourses(data.totalCourses);
        setLastMonthCourses(data.lastMonthCourses);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box px={5} width="100%" >
      {/* Buttons To Createions */}
      <Box display="flex" mb={3} mr={3} gap={2}>
        {currentUser.isAdmin && (
          <Link to={'/sign-up'}>
            <Button variant='contained'>Create User</Button>
          </Link>
        )}
        {currentUser.isAdmin && (
          <Link to={'/create-course'}>
            <Button variant='contained'>Create Course</Button>
          </Link>
        )}
      </Box>

      {/* Displaying Total Users And Recent Users and Courses */}
      <Box display="flex" justifyContent="center" mt={3}>

        {/* Total Users Component */}
        <Box flex={1} p={2} bgcolor="#Dfdfe2" borderRadius={4} boxShadow={4}>
          <Box display="flex" justifyContent="space-between">
            <HiOutlineUserGroup fontSize="30px" color="#2074d4" />
            <Typography variant="h4">TOTAL USER COUNT</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Box>
          {/* Displaying Last Month Users Count */}
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="h6" color="success">+{lastMonthUsers}</Typography>
            <Typography variant="h6" marginLeft={2} color="textSecondary">Last month</Typography>
          </Box>
        </Box>

        {/* Total Courses Component */}
        <Box flex={1} p={2} bgcolor="#Dfdfe2" borderRadius={4} boxShadow={4} ml={3}>
          <Box display="flex" justifyContent="space-between">
            <HiOutlineAcademicCap fontSize="30px" color="#2074d4" />
            <Typography variant="h4">TOTAL COURSE COUNT</Typography>
            <Typography variant="h4">{totalCourses}</Typography>
          </Box>
          {/* Displaying Last Month Courses Count */}
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="h6" color="success">+{lastMonthCourses}</Typography>
            <Typography variant="h6" marginLeft={2} color="textSecondary">Last month</Typography>
          </Box>
        </Box>
      </Box>

      {/* Displaying Recent Users */}
      <Box display="flex" justifyContent="space-between" py={3}>

        {/* Recent Users Component */}
        <TableContainer component={Box} flex={1} borderRadius={4} boxShadow={4} bgcolor="#A09c9c">
          <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="white">RECENT USERS</Typography>
            <Button variant='outlined' component={Link} to='/dashboard?tab=users' sx={{ bgcolor: '#Cb136d', color: '#fff' }}>See all</Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IMAGE</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>EMAIL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Displaying List Of Recent Users */}
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Avatar src={user.profilePicture} />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Recent Courses Component */}
        <TableContainer component={Box} flex={1} borderRadius={4} boxShadow={4} bgcolor="#A09c9c" ml={3}>
          <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" color="white">Recent Courses</Typography>
            <Button variant='outlined' component={Link} to='/dashboard?tab=courses' sx={{ bgcolor: '#Cb136d', color: '#fff' }}>See all</Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>COURSE NAME</TableCell>
                <TableCell>COURSE CODE</TableCell>
                <TableCell>COURSE PRICE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Displaying List Of Recent Courses */}
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.courseCode}</TableCell>
                  <TableCell>{course.coursePrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
