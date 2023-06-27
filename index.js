const express = require("express");
const uploadFile = require("./services/uploadFile")
const uploadFiles = require("./services/uploadFiles")
const fetchFile = require('./services/fetchFile')

// Create an Express app
const app = express();
// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


app.use('/uploadFile', uploadFile);
app.use('/uploadFiles', uploadFiles);
app.use('/fetchFile', fetchFile);