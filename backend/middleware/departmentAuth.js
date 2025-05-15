const jwt = require('jsonwebtoken');
const Department = require('../models/Department');

module.exports = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const department = await Department.findById(decoded.id);
    if (!department) {
      return res.status(401).json({ success: false, message: 'Not authorized, department not found' });
    }
    req.user = department;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
}; 