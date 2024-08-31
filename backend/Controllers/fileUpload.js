// const { execFile } = require('child_process');
// const path = require('path');
// const fs = require('fs');

// exports.imageUpload = async (req, res) => {
//   try {
//     // Data Fetch
//     const file = req.files["image"];

//     // Validation
//     const supportedTypes = ["jpg", "jpeg", "png", "heic"];
//     const fileNameParts = file.name.split(".");
//     const fileType = fileNameParts[fileNameParts.length - 1].toLowerCase();
//     if (!supportedTypes.includes(fileType)) {
//       return res.status(415).json({
//         success: false,
//         message: "Unsupported Media Type",
//       });
//     }

//     // Use the existing /tmp/ directory for storing the uploaded file
//     const filePath = path.join('/tmp', file.name);
//     await file.mv(filePath);

//     // Call the Python script with the image path
//     execFile('python3', [path.join(__dirname, '..', 'model', 'model_inference.py'), filePath], (error, stdout, stderr) => {
//       if (error) {
//         console.error("Error occurred during AI model inference", error);
//         return res.status(500).json({
//           success: false,
//           message: "Internal Server Error",
//         });
//       }

//       // The result will be in stdout
//       const result = stdout.trim();

//       // Send the result back to the client
//       res.json({
//         success: true,
//         disease: result,
//         message: "Image processed successfully",
//       });

//       // Delete the temporary file
//       fs.unlink(filePath, (err) => {
//         if (err) console.error("Failed to delete temporary image file", err);
//       });
//     });
//   } catch (error) {
//     console.error("Error occurred while uploading image", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.imageUpload = async (req, res) => {
  try {
    // Data Fetch
    const file = req.files["image"];

    // Validation
    const supportedTypes = ["jpg", "jpeg", "png", "heic"];
    const fileNameParts = file.name.split(".");
    const fileType = fileNameParts[fileNameParts.length - 1].toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(415).json({
        success: false,
        message: "Unsupported Media Type",
      });
    }

    // Use the existing /tmp/ directory for storing the uploaded file
    const filePath = path.join('/tmp', file.name);
    await file.mv(filePath);

    // Call the Python script with the image path
    execFile('python3', [path.join(__dirname, '..', 'model', 'model_inference.py'), filePath], (error, stdout, stderr) => {
      if (error) {
        console.error("Error occurred during AI model inference", error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }

      // The result will be in stdout
      const result = stdout.trim();

      // Send the result back to the client
      res.json({
        success: true,
        disease: result,
        message: "Image processed successfully",
      });

      // Delete the temporary file
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete temporary image file", err);
      });
    });
  } catch (error) {
    console.error("Error occurred while uploading image", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
