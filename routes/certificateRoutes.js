const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const certificateController = require("../controllers/certificateController");
const recipientHandler = require('../utils/recipient-handler');

router.post("/", recipientHandler.csvUpload.single('recipient'), authController.userVerification, createCertifcates );

function createCertifcates(req, res, next){
    console.log(req.file)
    req.body.CSVfile = req.file.path;
    certificateController.createCertifcates(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

module.exports = router;