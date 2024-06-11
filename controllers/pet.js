const fs = require("node:fs");
const path = require("node:path");
const Pet = require("../models/pet");

//get the avatar image
const getImage = (req, res) => {
  //get the param
  const { image } = req.params;

  //get the real image's path
  const filePath = "./uploads/pets/" + image;

  //check if the image exists
  fs.stat(filePath, (error, exists) => {
    if (error) {
      return res.status(404).send({
        status: "error",
        message: "there was an error getting the file",
      });
    }

    if (!exists) {
      return res
        .status(404)
        .send({ status: "error", message: "image not found" });
    }
  });

  //return the image
  return res.status(200).sendFile(path.resolve(filePath));
};

const listPets = async (req, res) => {
  const user = req.user;

  const pets = await Pet.findAll({ where: { userId: user.id } });

  if (!pets.length)
    return res
      .status(200)
      .send({ error: false, message: "No pets found", pets: [] });

  return res
    .status(200)
    .send({ error: false, message: "pets listed successfully", pets });
};

module.exports = { getImage, listPets };
