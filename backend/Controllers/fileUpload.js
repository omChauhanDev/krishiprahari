exports.imageUpload = async (req, res) => {
  try {
    // Data Fetch
    const file = req.files["file"];

    // Validation
    const supportedTypes = ["jpg", "jpeg", "png", "heic"];
    const fileNameParts = file.name.split(".");
    const fileType = fileNameParts[fileNameParts.length - 1].toLowerCase();
    if (!isSupportedFile(fileType, supportedTypes)) {
      return res.status(415).json({
        success: false,
        message: "Unsupported Media Type",
      });
    }

    // Give this image to ai model
    // Then wait for result from ai model
    // sent back the result to user through res.json


    res.json({
      success: true,
      url: response.secure_url,
      userFiles: user.files,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    console.error("Error occurred while uploading image", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
