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
    <div style={{ marginBottom: '3rem', marginTop: '3rem',marginRight: 'auto', marginLeft: 'auto',width:'600px' }}>
      <div style={{ marginBottom: '20px' ,textAlign: 'center'}}>
        <h1 >- CREATE COURSE -</h1>
        <hr style={{ marginTop: '10px', marginBottom: '20px' }} />
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <FormControl fullWidth>
            <TextField
              label="Course Name"
              type='text'
              required
              id='courseName'
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FormControl fullWidth>
            <TextField
              label="Course Code"
              type='text'
              required
              id='courseCode'
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FormControl fullWidth>
            <TextField
              label="Course Description"
              type='text'
              required
              id='courseDescription'
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FormControl fullWidth>
            <TextField
              label="Course Price"
              type='text'
              required
              id='coursePrice'
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="enrolledFacultyLabel">Assigned Teacher</InputLabel>
            <Select
              labelId='enrolledFacultyLabel'
              value={formData.enrolledTeacher || ''}
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
        <Button type='submit' variant='contained' color='primary' style={{width:'600px'}}>
          Create Course
        </Button>
        {publishError && (
          <Alert severity='error' style={{ marginTop: '20px' }}>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
