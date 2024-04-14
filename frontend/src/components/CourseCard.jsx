import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function CourseCard({ course }) {
  const truncatedDescription = course.courseDescription.length > 200
    ? course.courseDescription.slice(0, 500) + '...'
    : course.courseDescription;

  return (
    <Box 
      border="1px solid #Cb136d"
      borderRadius="8px"
      overflow="hidden"
      className='hover:border-2 transition-all h-[110px] w-[auto] flex flex-row mb-4'
    >      
      {/* Course Details */}
      <Box className='gap-2 ml-3 mr-3 mt-2'>
        <Link to={`/course/${course.slug}`}>
          <Box className='flex flex-col'>
            {/* Course Code and Name */}
            <div className='flex flex-row'>
              <Typography variant="subtitle1" fontWeight="bold" color="#Cb136d" fontSize={16}>
                {(course.courseCode)}
              </Typography>
              <Typography variant="subtitle1" color="black" ml={1} mr={1} fontSize={16}>
                |
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="#2074d4" fontSize={16}>
                {(course.courseName)}
              </Typography>
            </div>
            <hr />
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
