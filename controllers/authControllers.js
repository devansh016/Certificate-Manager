const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if(user && user.verifyUserPassword(password)) {
        return { "status": 200, "token": user.generateToken() };
    } else {
        return { "status": 403, "message": "Wrong email or password." };
    }
}

async function register({ name, email, password }) {
    if (await User.findOne({ email })) {
        return { "status": 409, "message": "Email id " + email + " is already in use." }
    }
    else {
        const user = new User({ "userID": uuidv4(), name, email, password });
        await user.save();
        return { "status": 200, "token": user.generateToken() };
    }
}

async function changePassword ({ userID, password, newpassword}){
    const user = await User.findOne({ userID });
    if(user){
        if (user.verifyUserPassword(password)) {
            user.changePassword(newpassword);
            return { "status": 200, "message": "Password changed." }
        }
        else {
            return { "status": 401, "message": "Current password incorrect." }
        }
    } else {
        return { "status": 500, "message": "Internal Server Error! Contact Admin." }
    }
}

async function userVerification(req, res, next) {
    try {
        if(!req.headers.authorization){
            res.status(401).send({ "status": 401, "message": "No token found."});
            return;
        }
        var authorization = req.headers.authorization.split(' ')[1],decoded;
        var decoded = jwt.verify(authorization, process.env.JWT_SECRET);    
        req.body.userID = decoded.userID;
        if(req.body.userID){
            next();
        }else{
            res.status(401).send({"status": 401, "message":"Unauthorized User."});
        }
    } catch(error) {
        res.status(400).send({"status": 401, "message": error.message});
    }
}

module.exports ={
    authenticate,
    register,
    changePassword,
    userVerification
}