const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const User = require('../models/user.model.js');
const validator = require('validator');

// Route to Test 
exports.test = (req, res) => {
  res.json({ message: 'API is Working!' });
};


// Route to Update User
exports.updateUser = async (req, res, next) => {
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
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          enrolledCourses: req.body.enrolledCourses,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// Route to Delete User
exports.deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You Are Not Allowed to Delete This User.'));
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json('User Has Been Deleted.');
    } catch (error) {
      next(error);
    }
  };

// Route to Delete User
exports.signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User Has Been Signed out.');
  } catch (error) {
    next(error);
  }
};

// Route to Get All Users
exports.getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You Are Not Allowed to See All Users.'));
  }
    try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
  
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
  
    const totalUsers = await User.countDocuments();
  
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};