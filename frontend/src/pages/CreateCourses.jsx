import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CreateCourses() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/course/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/dashboard?tab=courses`);
      }
    } catch (error) {
      setPublishError('Something Went Wrong');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };  

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen mt-10'>
      <div>
        <Typography variant="h4" align="center" color="primary"> - Create Course - </Typography>
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='mt-2'>
          <label>Course Name</label>
          <TextField
            type='text'
            placeholder='Course Name'
            required
            id='courseName'
            className='flex-1 mt-2 w-full'
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <label>Course Code</label>
          <TextField
            type='text'
            placeholder='Course Code'
            required
            id='courseCode'
            className='flex-1 mt-2 w-full'
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <label>Course Description</label>
          <TextField
            type='text'
            placeholder='Course Description'
            required
            id='courseDescription'
            className='flex-1 mt-2 w-full'
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <label>Course Price</label>
          <TextField
            type='text'
            placeholder='Course Price'
            required
            id='coursePrice'
            className='flex-1 mt-2 w-full'
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <FormControl className='flex-1 mt-2 w-full'>
            <label>Assigned Teacher</label>
            <Select
              labelId='enrolledFacultyLabel'
              value={formData.enrolledTeacher}
              onChange={(e) =>
                setFormData({ ...formData, enrolledTeacher: e.target.value })
              }
            >
              <MenuItem value=''>Select Lecturer</MenuItem>
              <MenuItem value='65faafe26a08c9c2d231e3d6'>Mr. Pasan Fernando</MenuItem>
              <MenuItem value='65faaffa6a08c9c2d231e3d8'>Mr. Dananjaya Abesinghe</MenuItem>
              <MenuItem value='65fa98425e8a62d5e954e25f'>Mr. Avishka Rathnakumara</MenuItem>
              <MenuItem value='65fab0136a08c9c2d231e3da'>Mrs. Sudarika Chethani</MenuItem>
              <MenuItem value='65fab02a6a08c9c2d231e3dc'>Mrs. Dimesha Wijerathne</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button type='submit' variant='contained' color='primary' className='mt-2'>
          Create Course
        </Button>
        {publishError && (
          <Alert className='mt-5' severity='error'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
