import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import CourseCard from '../components/CourseCard';
import { Typography, Box, Divider } from '@mui/material'; 

export default function Home() {
  const [courses, setCourses] = useState([]); // State Variable For Storing Courses

  // Fetch Courses When Component Mounts
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch('/api/course/getCourses');
      const data = await res.json();
      setCourses(data.courses);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px', marginBottom: '40px', paddingLeft: '20px', paddingRight: '20px', maxWidth: '1200px', margin: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
          <img src={logo} alt="Stark Logo" style={{ height: '100px', width: '100px', borderRadius: '8px'}} />
          <Typography variant="h2" sx={{ color: '#2D3B48', textTransform: 'uppercase', margin: 'auto', fontFamily: 'serif' }}>The Future...</Typography>
        </Box>
        <Divider />
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
      <div sx={{ maxWidth: '6xl', margin: 'auto', paddingBottom: '3rem', display: 'flex', flexDirection: 'column' }}>
        {/* Render Recent Courses If Available */}
        {courses && courses.length > 0 && (
          <div sx={{ marginBottom: '1.5rem' }}>
            <hr sx={{ borderColor: 'rgba(219,234,254,var(--tw-border-opacity))' }} />
            <h1 variant="h2" sx={{ fontSize: '1.25rem', textTransform: 'uppercase', color: '#1E3A8A', fontWeight: 'bold', padding: '1rem 0' }}>Available Courses</h1>
            <hr sx={{ borderColor: 'rgba(219,234,254,var(--tw-border-opacity))' }}/>
            <div sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              {/* Map Through Courses And Render CourseCard For Each */}
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}