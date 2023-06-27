// Single File Uploader

const upload = require("../gridfs_config")
const express = require('express');
const router = express.Router();

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No File Provided' });
  }

  // File upload successful
  return res.status(200).json({ message: 'File uploaded successfully', file: req.file.filename });
});

module.exports = router;