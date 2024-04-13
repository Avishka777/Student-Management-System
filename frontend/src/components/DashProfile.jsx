import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { updateStart, updateSuccess, updateFailure, signoutSuccess } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';


export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user); // Getting CurrentUser, Error, And Loading State From Redux Store
  const [imageFile, setImageFile] = useState(null); // State Variable For Storing Image File
  const [imageFileUrl, setImageFileUrl] = useState(null); // State Variable For Storing Image File URL
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null); // State Variable For Storing Image File Upload Progress
  const [imageFileUploadError, setImageFileUploadError] = useState(null); // State Variable For Storing Image File Upload Error
  const [imageFileUploading, setImageFileUploading] = useState(false); // State Variable For Indicating Whether Image File Is Uploading
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null); // State Variable For Indicating Update User Success
  const [updateUserError, setUpdateUserError] = useState(null); // State Variable For Indicating Update User Error
  const [showModal, setShowModal] = useState(false); // State Variable For Indicating Whether Modal Is Visible
  const [formData, setFormData] = useState({}); // State Variable For Form Data
  const filePickerRef = useRef(); // Reference For File Input Element
  const dispatch = useDispatch(); // useDispatch Hook For Dispatching Redux Actions
  
  // Function To Handle Image Change
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

  // Function To Upload Image
  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if 
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
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

  // Function To Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No Changes made');
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

  // Function To Handle Signout
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
    <div className='max-w-lg mx-auto p-3 w-full mt-10'>
      <div>
          <h1 className="text-3xl text-sky-600 text-center font-serif uppercase"> - Profile details - </h1>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgress
              variant="determinate"
              value={parseInt(imageFileUploadProgress)}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert severity='error'>{imageFileUploadError}</Alert>
        )}
        <TextField
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextField
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextField
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button
          type='submit'
          variant='contained'
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        
      </form>
      <div className='text-red-500 flex justify-center border-2 border-red-800 p-1 rounded mt-5'>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert severity='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert severity='error' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert severity='error' className='mt-5'>
          {error}
        </Alert>
      )}
      {/* Modal */}
    </div>
  );
}