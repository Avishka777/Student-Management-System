import { CircularProgress, Typography, Box, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

export default function CoursePage() {
  const { courseSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [course, setCourse] = useState(null);
  const [recentCourses, setRecentCourses] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/course/getcourses?slug=${courseSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
        } else {
          setCourse(data.courses[0]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseSlug]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">Error fetching course data.</Typography>
      </Box>
    );
  }

  return (
    <main>
      <Box maxWidth="1200px" mx="auto" minHeight="100vh" p={3} >
        <Box display="flex" justifyContent="center" mt={10}>
          <Typography variant="h3" align="center" color="primary"> COURSE DETAILS </Typography>
        </Box>
        <Divider my={4} />
        <Typography variant="h6" align="center" color="secondary">{course && `${course.courseCode} | ${course.courseName}`}</Typography>
        <Box display="flex" justifyContent="center" my={2}>
          <Typography variant="body1">{course && new Date(course.createdAt).toLocaleDateString()}</Typography>
          <Box mx={2} />
          <Typography variant="body1">Course Price: {course && course.coursePrice}</Typography>
        </Box>
        <Box mx={2} my={4}>
          <Typography variant="body1">Course Description:</Typography>
          <Typography variant="body2" color="textSecondary">{course && course.courseDescription}</Typography>
        </Box>
        
        <Divider my={4} />
       
      </Box>
    </main>
  );
}
