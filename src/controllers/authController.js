require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Your User model

// Helper to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // e.g., '1d' for 1 day
  });
};

// Step 1: Send OTP (assuming OTP is already verified)
const generateOTP = async (req, res) =>{
  console.log(req.body);
const {mobileNumber} = req.body;
return res.status(200).json({msg:"OTP sent"});
  // Implement your OTP sending logic here
  // Ensure OTP verification before generating JWT
};

// Step 2: Verify OTP and Generate JWT
const verifyOTPAndGenerateToken = async (req, res) => {
  const { mobileNumber, otpNumber } = req.body;
  console.log(mobileNumber);

  try {
    // 1. Validate the OTP for the mobile number (implement OTP verification here)
    const isOTPValid = true; // Replace with your OTP verification logic
    if (!isOTPValid) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // 2. OTP is valid, find or create user in database
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      user = new User({ mobileNumber });
      await user.save();
    }

    // 3. Generate JWT token
    console.log('JWT->',user._id)
    const token = generateToken(user._id);
    res.status(200).json({ token, msg: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Step 3: Middleware to Protect Routes
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Access denied, token missing!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'Invalid token' });
    }
    req.user = decoded;
    console.log(req.user)
    next();
  });
};

module.exports = { generateOTP, verifyOTPAndGenerateToken, authenticateJWT };
