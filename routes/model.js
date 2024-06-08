const express = require("express");
const router = express.Router();
const multer = require("multer");
const { upload } = require("../controllers/model.js");
const { auth } = require("../middlewares/auth.js");

// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/pets/");
  },
  filename: (req, file, cb) => {
    cb(null, `pet-${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage });

router.post("/upload", [auth, uploads.single("image")], upload);

module.exports = router;
