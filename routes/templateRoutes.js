const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const templateController = require("../controllers/templateController");
const filerHandler = require('../utils/file-handler');

router.post("/", authController.userVerification, createTemplate );
router.post("/upload", authController.userVerification, filerHandler.uploadDesign.single('design'), uploadTemplateDesign);

function createTemplate(req, res, next){
    templateController.createTemplate(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function uploadTemplateDesign (req, res, next){
    req.body.path = req.file.location;
    templateController.uploadTemplateDesign(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}
module.exports = router;