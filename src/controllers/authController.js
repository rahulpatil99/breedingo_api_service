require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Your User model

// Helper to generate a JWT
const generateJWTToken = (userId) => {
  const JWT_EXPIRATION_Value = process.env.JWT_EXPIRATION || '180d'
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_Value, // e.g., '1d' for 1 day
  });
};

// Step 1: Send OTP
const sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // Implement OTP generation and sending logic here
    // Example: Save OTP with an expiration time in a cache or database

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Step 2: Verify OTP and Login
const verifyOTPAndLogin = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  try {
    if (!mobileNumber || !otp) {
      return res.status(400).json({ message: 'Mobile number and OTP are required' });
    }

    // Example: Verify OTP logic here
    const isOTPValid = true; // Replace with actual verification logic
    if (!isOTPValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Find or create user in the database
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      user = new User({ mobileNumber });
      await user.save();
    }

    // Generate JWT
    const token = generateJWTToken(user._id);

    return res.status(200).json({
      token,
      userStatus: user.status,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Step 3: Middleware to Authenticate Requests
const authenticateRequest = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach user to request object
    next();
  });
};

module.exports = {
  sendOTP,
  verifyOTPAndLogin,
  authenticateRequest,
};
