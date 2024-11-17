const express = require("express");
const router = express.Router();
const {registerUser,userUpdate,updateDebitCoin} = require("../controllers/userController");
const {getUserCattleForSale} = require("../controllers/cattleSellController");

router.route("/register").post(registerUser);
router.route("/update").put(userUpdate);
router.route("/getContact").post(updateDebitCoin);
router.route("/cattle/sell").get(getUserCattleForSale);

module.exports = router;