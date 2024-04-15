import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import CourseCard from '../components/CourseCard';
import { Typography, Box, Divider } from '@mui/material'; 

export default function Courses() {
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
    <div style={{marginTop:'5rem', marginBottom:'5rem'}}>
      {/* Top Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10rem', marginBottom: '40px', paddingLeft: '10rem', paddingRight: '10rem', margin: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
          <img src={logo} alt="PHOENIX LOGO" style={{ height: '100px'}} />
          <Typography variant="h2" sx={{ margin: 'auto', fontFamily: 'serif' }}>OUR COURSES...</Typography>
        </Box>
        <Divider sx={{marginY:'1rem'}} />
        <Typography variant="body1" sx={{ color: '#6B7280' }}>
        We are a leading non-state degree awarding institute approved by the University Grants Commission (UGC) under the Universities Act. We are also members of the 
        Association of Commonwealth Universities (ACU), as well as the International Association of Universities (IAU), and the first Sri Lankan institute to be 
        accredited by the Institution of Engineering & Technology, UK.
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280', marginTop:'1rem' }}>
        We are proud to be listed as a leading and formidable awarding institute authorised and approved by the University Grants Commission (UGC) under the Universities 
        Act, and the International Association of Universities (IAU). Furthermore, not only we are the first Sri Lankan institute to be accredited by the Institute of 
        Engineering & Technology(IET.), UK, our IT degrees are also in turn accredited by the Engineering Council, UK.
        </Typography>
      </Box>
      
      {/* Recent Courses Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '10rem', paddingRight: '10rem', margin: 'auto', marginTop: '2rem' }}>
        {/* Render Recent Courses If Available */}
        {courses && courses.length > 0 && (
         <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10rem', marginBottom: '40px', margin: 'auto' }}>
            <h1 style={{ fontSize: '1.8rem', textTransform: 'uppercase', color: '#CB136D', fontWeight: 'bold'}}>ALL Courses...</h1>
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