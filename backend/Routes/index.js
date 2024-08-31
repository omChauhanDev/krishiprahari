const express = require("express");
const router = express.Router();
const fileUploadRouter = require("./fileUpload");

router.use("/upload", fileUploadRouter);
module.exports = router;