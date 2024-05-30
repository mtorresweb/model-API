const tf = require("@tensorflow/tfjs-node");
const fs = require("node:fs");

// Load the graph model
const modelPath = "/home/michael/Projects/model API/model/model.json";
const model = fs.readFileSync(modelPath, "utf8");

// Define a route to serve the model
exports.getModel = (req, res) => {
  res.json(model);
};

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
    return classIdx;
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
  try {
    if (!req.file) {
      return res
        .status(404)
        .send({ status: "error", message: "could not get the file" });
    }

    //get file name
    const image = req.file.originalname;

    //get file extension
    const imageSplit = image.split(".");
    const extension = imageSplit[imageSplit.length - 1];

    const prediction = await predict(req.file.path);

    //return an answer
    return res.status(200).send({
      status: "success",
      message: "file uploaded successfully",
      file: req.file,
      prediction: prediction || "failed prediction",
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
