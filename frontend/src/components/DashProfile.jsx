import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin:'3rem' }}>
      <div>
        <h1> - PROFILE DETAILS - </h1>
        <hr style={{maxWidth:'600px'}} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
          style={{ width: '50px' }}
        />
        <div onClick={() => filePickerRef.current.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '80px',
                  height: '80px',
                  margin: 'auto',
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            style={{ width: '150px' , borderRadius:'50px', margin:'1rem' }}
            className={` ${
              imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && <p style={{ color: 'red' }}>{imageFileUploadError}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TextField
            type='text'
            id='username'
            label='Username'
            defaultValue={currentUser.username}
            onChange={handleChange}
            variant='outlined'
            style={{ marginBottom: '10px', width:'400px'  }}
          />
          <TextField
            type='email'
            id='email'
            label='Email'
            defaultValue={currentUser.email}
            onChange={handleChange}
            variant='outlined'
            style={{ marginBottom: '10px', width:'400px'  }}
          />
          <TextField
            type='password'
            id='password'
            label='Password'
            onChange={handleChange}
            variant='outlined'
            style={{ marginBottom: '10px', width:'400px'  }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading || imageFileUploading}
            style={{ marginTop: '10px', width:'400px'  }}
          >
            {loading ? 'Loading...' : 'Update'}
          </Button>
        </div>
      </form>
      <div style={{ cursor: 'pointer', color: 'red', margin:'2rem' }}>
        <span onClick={handleSignout} style={{ cursor: 'pointer', color: 'red', fontWeight:'600'}}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && <p style={{ color: 'green' }}>{updateUserSuccess}</p>}
      {updateUserError && <p style={{ color: 'red' }}>{updateUserError}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
