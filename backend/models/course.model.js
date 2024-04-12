const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    courseDescription: {
        type: String,
        required: true,
      },
    courseCredit: {
      type: String,
    },
    enrolledStudents: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    enrolledfaculty: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
{ timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;