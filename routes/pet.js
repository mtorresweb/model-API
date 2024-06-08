const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet");
const { auth } = require("../middlewares/auth.js");

router.get("/getimage/:image", petController.getImage);
router.get("/list", auth, petController.listPets);

module.exports = router;
