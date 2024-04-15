import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import CourseCard from '../components/CourseCard';
import { Typography, Box, Divider } from '@mui/material'; 

export default function Home() {
  const [courses, setCourses] = useState([]); // State Variable For Storing Courses

  // Fetch Courses When Component Mounts
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch('/api/course/getcourses?limit=4');
      const data = await res.json();
      setCourses(data.courses);
    };
    fetchCourses();
  }, []);

  return (
    
    <div style={{marginTop:'5rem', marginBottom:'5rem'}}>
      {/* Top Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10rem', marginBottom: '40px', paddingLeft: '10rem', paddingRight: '10rem', margin: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
          <img src={logo} alt="PHOENIX LOGO" style={{ height: '100px'}} />
          <Typography variant="h2" sx={{ margin: 'auto', fontFamily: 'serif' }}>PHOENIX  INSTITUTE...</Typography>
        </Box>
        <Divider sx={{marginY:'1rem'}} />
        <Typography variant="body1" sx={{ color: '#6B7280' }}>
          Welcome to Phoenix Institute, a leading institution dedicated to fostering excellence in education and innovation. At Phoenix, we believe in empowering students with 
          knowledge and skills that prepare them for the challenges of the modern world. With a dynamic curriculum designed to meet the evolving needs of industries and society, 
          we offer a diverse range of programs across various disciplines, including technology, business, arts, and sciences. Our experienced faculty members are committed to 
          providing personalized guidance and support to help students realize their full potential. Through state-of-the-art facilities and interactive learning experiences, 
          we strive to create a vibrant learning community where creativity thrives and ideas flourish. Join us at Phoenix Institute and embark on a journey of discovery, growth, 
          and success.
        </Typography>
      </Box>
      
      {/* Recent Courses Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '10rem', paddingRight: '10rem', margin: 'auto', marginTop: '2rem' }}>
        {/* Render Recent Courses If Available */}
        {courses && courses.length > 0 && (
         <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10rem', marginBottom: '40px', margin: 'auto' }}>
            <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', color: '#CB136D', fontWeight: 'bold'}}>New Courses...</h1>
            <hr style={{ color: 'gray' }}/>
            <div>
              {/* Map Through Courses And Render CourseCard For Each */}
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </Box>
        )}
      </Box>
      
    </div>
  );
}