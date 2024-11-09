const express = require("express");
const router = express.Router();
const {addCattleForSell,getCattleSell,getAllCattleSell} = require("../controllers/cattleSellController")

router.route("/sell").get(getAllCattleSell);
router.route("/sell:id").get(getCattleSell);
router.route("/sell").post(addCattleForSell);

module.exports = router;