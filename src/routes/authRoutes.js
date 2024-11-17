const express = require("express");
const router = express.Router();
const {generateOTP,verifyOTPAndGenerateToken} = require("../controllers/authController")
//const {registerUser} = require("../controllers/userController")

router.route("/").post(generateOTP);
router.route("/verify").post(verifyOTPAndGenerateToken);


module.exports = router;