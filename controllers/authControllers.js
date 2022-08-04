const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

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
        const user = new User({ "userID": crypto.randomBytes(8).toString('hex'), name, email, password });
        await user.save();
        return { "status": 200, "token": user.generateToken() };
    }
}

module.exports ={
    authenticate,
    register,
}