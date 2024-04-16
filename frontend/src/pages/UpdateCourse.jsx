import React, { useEffect, useState } from 'react';
import { Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdateCourse() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/getcourses?courseId=${courseId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          // Set formData including enrolledTeacher
          setFormData({
            ...data.courses[0],
            enrolledTeacher: data.courses[0].enrolledTeacher
          });
        }
      } catch (error) {
        console.log(error.message);
        setPublishError('Something went wrong');
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/course/updatecourse/${formData._id}`, {
        method: 'PUT',
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
      setPublishError('Something went wrong');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div style={{ marginBottom: '3rem', marginTop: '3rem', marginRight: 'auto', marginLeft: 'auto', width: '600px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Typography variant="h4" align="center" color="primary">- UPDATE COURSE -</Typography>
        <hr style={{ marginTop: '10px', marginBottom: '20px' }} />
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label>Course Name</label>
          <TextField
            type='text'
            placeholder='Course Name'
            required
            id='courseName'
            onChange={handleChange}
            value={formData.courseName || ''}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Course Code</label>
          <TextField
            type='text'
            placeholder='Course Code'
            required
            id='courseCode'
            onChange={handleChange}
            value={formData.courseCode || ''}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Course Description</label>
          <TextField
            type='text'
            placeholder='Course Description'
            required
            id='courseDescription'
            onChange={handleChange}
            value={formData.courseDescription || ''}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Course Price</label>
          <TextField
            type='text'
            placeholder='Course Price'
            required
            id='coursePrice'
            onChange={handleChange}
            value={formData.coursePrice || ''}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <FormControl style={{ width: '100%' }}>
            <label>Assigned Teacher</label>
            <Select
              labelId='enrolledTeacherLabel'
              value={formData.enrolledTeacher || ''}
              onChange={(e) => handleChange({ target: { id: 'enrolledTeacher', value: e.target.value } })}
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
        <Button type='submit' variant='contained' color='primary' style={{ width: '100%' }}>
          Update Course
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
