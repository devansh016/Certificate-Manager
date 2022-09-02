const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
const eventControllers = require("../controllers/eventController")

router.post("/", authController.userVerification, createEvent);
router.delete("/", authController.userVerification, deleteEvent);
router.get("/", authController.userVerification, getEvent);

function createEvent(req, res, next){
    eventControllers.createEvent(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function deleteEvent(req, res, next){
    eventControllers.deleteEvent(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function getEvent(req, res, next){
    if(req.body.eventID){
        eventControllers.getEvent(req.body)
            .then( data => {
                res.status(data.status).send(data);
            })
    } else {
        eventControllers.getAllEvent(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
    }
}

module.exports = router;
