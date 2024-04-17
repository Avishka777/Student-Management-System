import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

export default function FileUploadCard() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('http://localhost:3000/api/upload', formData);
      setUploadedFile(response.data);
      setUploadError(null);
    } catch (error) {
      setUploadedFile(null);
      setUploadError(error.response.data.message);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Upload Your Home Works
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 0 , fontSize: '0.7rem' , p:'0.4rem'}}>
        Upload
      </Button>
      {uploadedFile && (
        <div>
          <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
            File Uploaded Successfully...
          </Typography>
        </div>
      )}
      {uploadError && (
        <div>
          <Typography variant="body1" color="error.main" sx={{ mt: 2 }}>
            Error: {uploadError}
          </Typography>
        </div>
      )}
    </div>
  );
}
