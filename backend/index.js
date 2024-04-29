const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const courseRoutes = require('./routes/course.route.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const upload = require('./fileUpload');

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB Connected.');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(3000, () => {
  console.log('Server Running On PORT 3000!');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json(req.file);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error.';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

module.exports = app;
