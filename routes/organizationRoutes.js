const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
const organizationController = require("../controllers/organizationController")

router.post("/", authController.userVerification, createOrganization);
router.delete("/", authController.userVerification, deleteOrganization);
router.get("/", authController.userVerification, getOrganization);

function createOrganization(req, res, next){
    organizationController.createOrganization(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function deleteOrganization(req, res, next){
    organizationController.deleteOrganization(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function getOrganization(req, res, next){
    if(req.body.organizationID){
        organizationController.getOrganization(req.body)
            .then( data => {
                res.status(data.status).send(data);
            })
    } else {
        organizationController.getAllOrganization(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
    }
}

module.exports = router;
