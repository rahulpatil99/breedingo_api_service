const express = require("express");
const router = express.Router();
const {newUserRegistration,updateDebitCoin} = require("../controllers/userController");
const {getUserCattleForSale} = require("../controllers/cattleSellController");

router.route("/getContact").post(updateDebitCoin);
router.route("/cattle/sell").get(getUserCattleForSale);

module.exports = router;