// Fetch single file by name

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

mongoURI = "mongodb://localhost:27017/test"

// Connect to MongoDB using Mongoose
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;
conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

router.get("/:file", (req, res) => {
    file = req.params.file;
    try {
        // Find the file by filename
        const downloadStream = gfs.openDownloadStreamByName(file);

        // Set the response headers
        res.set('Content-Type', 'image/*');

        // Pipe the file data to the response stream
        downloadStream.pipe(res);

        downloadStream.on('error', (error) => {
            console.error('Failed to fetch image:', error);
            res.status(500).json({ error: 'Failed to fetch image' });
        });

    } catch (error) {
        console.error('Failed to fetch image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

module.exports = router;