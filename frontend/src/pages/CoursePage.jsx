import { CircularProgress, Typography, Box, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import FileUploadCard from '../components/FileUploadCard';

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
      <Box maxWidth="1200px" mx="auto" minHeight="100vh" p={3} my={3} >
  
        
        <Typography variant="h4" align="center" color="#Cb136d">{course && `${course.courseCode} | ${course.courseName}`}</Typography>
        <Divider mt={4} />
       
        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 1</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>

        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 2</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>

        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 3</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>

        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 4</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>

        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 5</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>

        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 6</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>

        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 7</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>

        <Box mx={2} my={4}>
          <Typography variant="h4" color="primary">Week 8</Typography>
          <Divider sx={{marginBottom:'1rem'}} />
          <FileUploadCard  sx={{margin:'1rem'}} />
        </Box>
       
      </Box>
    </main>
  );
}
