const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")

router.post("/signin", signinUser);
router.post("/signup", signupUser);
router.patch("/changePassword", authController.userVerification, changePassword);

function signinUser(req, res, next){
    authController.authenticate(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

function signupUser(req, res, next){
    authController.register(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}
function changePassword(req, res, next){
    authController.changePassword(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
}

module.exports = router;
