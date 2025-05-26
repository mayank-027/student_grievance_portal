const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, studentId, course, role, phoneNumber, profilePic } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      studentId,
      course,
      role: role || 'student',
      phoneNumber,
      profilePic,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        course: user.course,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ studentId }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        studentId: user.studentId,
        email: user.email,
        course: user.course,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        course: user.course,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// @desc    Update current logged in user's profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, studentId, course, phone, profilePic } = req.body;

    // Only update fields that are present in the request
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (studentId) updateFields.studentId = studentId;
    if (course) updateFields.course = course;
    if (phone) updateFields.phoneNumber = phone;
    if (profilePic) updateFields.profilePic = profilePic;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ success: false, message: 'Student ID or email already exists.' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
}; 