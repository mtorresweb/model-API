const express = require("express");
const modelRouter = express.Router();
const multer = require("multer");
const { upload } = require("../controllers/model.js");

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

modelRouter.post("/upload", [uploads.single("image")], upload);

module.exports = { modelRouter, uploads };
