const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:'https://firebasestorage.googleapis.com/v0/b/mern-university-management.appspot.com/o/profile-icon.jpg?alt=media&token=c487ef8b-8243-471e-b8b1-1899b28fd80d',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isFaculty: {
      type: Boolean,
      default: false,
    },
    role: { 
      type: String, 
      default: false 
    },
    enrolledCourses: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses' 
    }]
  },
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;