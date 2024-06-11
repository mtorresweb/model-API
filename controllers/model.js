const tf = require("@tensorflow/tfjs-node");
const fs = require("node:fs");
const Pet = require("../models/pet");
const { labels } = require("../constants/breeds.js");

// Define a route to receive ImageData and make a prediction
const predict = async (imagePath) => {
  // Load the model
  try {
    const model = await tf.loadGraphModel("file://./model/model.json");

    const imageData = fs.readFileSync(imagePath);

    // Preprocess the ImageData
    const preprocessedData = preprocessImageData(
      tf.node.decodeImage(imageData),
    );

    // Make a prediction using the model
    const results = model.predict(preprocessedData);
    const predictions = results.arraySync();

    const classIdx = results.as1D().argMax().dataSync()[0];

    // Send the prediction as response
    return { classIdx, predictions };
  } catch (error) {
    console.log(error.message);
    return "error making prediction";
  }
};

// Function to preprocess the ImageData
function preprocessImageData(imageData) {
  // Preprocess the ImageData here
  const preprocessedData = tf.image.resizeBilinear(imageData, [299, 299]);

  // Add an extra dimension to represent the batch size
  const batchedImageData = preprocessedData.expandDims(0);

  // Return the preprocessed data
  return batchedImageData;
}

exports.upload = async (req, res) => {
  const user = req.user;

  try {
    if (!req.file) {
      return res
        .status(404)
        .send({ error: true, message: "could not get the file" });
    }

    //get file name
    const image = req.file.originalname;

    //get file extension
    const imageSplit = image.split(".");
    const extension = imageSplit[imageSplit.length - 1];

    const { classIdx, predictions } = await predict(req.file.path);

    const pet = Pet.create({
      userId: user.id,
      image: req.file.path.replace("uploads/pets/", ""),
      breed: labels[classIdx].breed,
      name: labels[classIdx].breed,
      description: labels[classIdx].description,
    });

    //return an answer
    return res.status(200).send({
      error: false,
      message: "file uploaded successfully",
      breed: labels[classIdx].breed,
      prediction: classIdx || "failed prediction",
      predictions: predictions || "failed prediction",
    });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};
