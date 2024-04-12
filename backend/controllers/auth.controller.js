const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Route to Create Sign-Up
exports.signup = async (req, res, next) => {
  const { username, email, password,role,enrolledCourses,isFaculty } = req.body;
  if (!username || !email || !password || username === '' || email === '' || password === '' ) {
    next(errorHandler(400, 'All Fields Are Required.'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password Must Be At Least 6 Characters.'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.email) {
    if (!validator.isEmail(req.body.email)) {
      return next(errorHandler(400, 'Invalid email address.'));
    }
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'User Name Must Be Between 7 and 20 Characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'User Name Can Not Contain Spaces'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'User Name Can Only Contain Letters and Numbers')
      );
    }
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    isFaculty,
    role,
    enrolledCourses,
  });
  try {
    await newUser.save();
    res.json('Signup Successful.');
  } catch (error) {
    next(error);
  }
};

// Route to Create Sign-In
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All Fields Are Required.'));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User Not Found.'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid Password.'));
    }
    const token = jwt.sign(
      { 
        id: validUser._id, 
        isAdmin: validUser.isAdmin,
        isFaculty: validUser.isFaculty
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Route to Add Google Login
exports.google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { 
          id: newUser._id, 
          isAdmin: newUser.isAdmin,
          isFaculty: validUser.isFaculty
        },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};