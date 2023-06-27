// Multiple Files Uploader

const upload = require("../gridfs_config")
const express = require('express');
const router = express.Router();

router.post('/', upload.array("files",30), (req, res) => {
    try{
        var files = []
        for(var i=0;i <req.files.length; i++){
            files.push((req.files)[i].filename)
        }
        return res.status(200).json({
            message: "Files Uploaded Successfully", 
            files: files });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Files Upload Unsuccessful"
        });
    }
});

module.exports = router;