const express = require("express");
const router = express.Router();
const {addCattleForSell,getCattleSell,getAllCattleSell,getAllSaveCattleSell,addSaveCattleSell,deleteSaveCattleSell} = require("../controllers/cattleSellController")

router.route("/sell").get(getAllCattleSell);
router.route("/sell:id").get(getCattleSell);
router.route("/sell").post(addCattleForSell);
router.route("/sell/save").get(getAllSaveCattleSell);
router.route("/sell/save").post(addSaveCattleSell);
router.route("/sell/save/:cattleSellId").delete(deleteSaveCattleSell);

module.exports = router;