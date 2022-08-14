const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers")
const organizationControllers = require("../controllers/organizationControllers")

router.post("/", authController.userVerification, createOrganization);
router.delete("/", authController.userVerification, deleteOrganization);
router.get("/", authController.userVerification, getOrganization);
router.get("/:organizationID", authController.userVerification, getOrganizationbyID);


function createOrganization(req, res, next){
    organizationControllers.createOrganization(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function deleteOrganization(req, res, next){
    organizationControllers.deleteOrganization(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function getOrganization(req, res, next){
    organizationControllers.getAllOrganization(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function getOrganizationbyID(req, res, next){
    req.body.organizationID = req.params.organizationID;
    organizationControllers.getOrganization(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

module.exports = router;
