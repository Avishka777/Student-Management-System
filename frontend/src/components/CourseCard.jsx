import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function CourseCard({ course }) {
  const truncatedDescription = course.courseDescription.length > 2000
    ? course.courseDescription.slice(0, 2000) + '...'
    : course.courseDescription;

  return (
    <Box  border="2px solid #Cb136d" borderRadius="8px" marginY={2} paddingX={2} paddingY={1}>      
      {/* Course Details */}
      <Box>
        <Link to={`/course/${course.slug}`} style={{ textDecoration: 'none' }}>
          <Box >
            {/* Course Code and Name */}
            <div>
              <Typography variant="subtitle1" fontWeight="bold" color="#2074d4" fontSize={16}>
                {(course.courseCode)} | {(course.courseName)}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1" fontWeight="bold" color="gray" fontSize={12}>
                Course Price - {(course.coursePrice)}
              </Typography>
            </div>
            <hr style={{color:'#2074d4'}}/>
            <div className='flex'>
              <Typography variant="subtitle1" color="#8c8e8f">
                {truncatedDescription}
              </Typography>
            </div>
          </Box>
        </Link>        
      </Box>
    </Box>
  );
}
