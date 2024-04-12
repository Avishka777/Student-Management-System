const express = require('express');
const { verifyToken } = require('../utils/verifyUser.js');
const { create, getcourses, deletecourse, updatecourse } = require('../controllers/course.controller.js');


const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getcourses', getcourses)
router.delete('/deletecourse/:courseId', verifyToken, deletecourse)
router.put('/updatecourse/:courseId', verifyToken, updatecourse)

module.exports = router;