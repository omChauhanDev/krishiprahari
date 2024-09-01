const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

exports.imageUpload = async (req, res) => {
  try {
    // Data Fetch
    const file = req.files["image"];
    // Validation
    const supportedTypes = ["jpg", "jpeg", "png", "heic"];
    const fileNameParts = file.name.split(".");
    const fileType = fileNameParts[fileNameParts.length - 1].toLowerCase();
    const extractPrediction = (stdout) => {
      const result = stdout.trim();
      const match = result.match(/Predicted class: ([\w,._()-]+)/);
      return match ? match[1] : null;
    };

    if (!supportedTypes.includes(fileType)) {
      return res.status(415).json({
        success: false,
        message: "Unsupported Media Type",
      });
    }

    // Use the existing /tmp/ directory for storing the uploaded file
    const filePath = path.join("/tmp", file.name);
    await file.mv(filePath);
    const modelPath = path.join(
      __dirname,
      "..",
      "model",
      "resnet_from_scratch.h5",
    );
    // Call the Python script with the image path
    execFile(
      "python3",
      [
        path.join(__dirname, "..", "model", "run_model.py"),
        // For production server
        // execFile('/var/task/.python/bin/python3', [path.join(__dirname, '..', 'model', 'run_model.py'),
        filePath,
        modelPath,
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error occurred during AI model inference", error);
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        }

        // The result will be in stdout
        const prediction = extractPrediction(stdout);
        console.log("Prediction extracted from output:", prediction);
        if (prediction) {
          res.json({
            success: true,
            disease: prediction,
            message: "Image processed successfully",
          });
        } else {
          res.json({
            success: false,
            message: "Failed to extract prediction from output",
          });
        }

        // Delete the temporary file
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete temporary image file", err);
        });
      },
    );
  } catch (error) {
    console.error("Error occurred while uploading image", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
