const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSchema = new Schema({
    userID: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.createdDate;
    }
});

userSchema.methods = {
    getUserID: function() { 
        return this.userID; 
    },
    verifyUserPassword: function(password) { 
        return bcrypt.compareSync( password, this.password);
    },
    generateToken: function() {
        return jwt.sign({ userID: this.userID }, process.env.JWT_SECRET, { expiresIn: '86400s' })
    }
}
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
        this.password = bcrypt.hashSync(this.password, 12);
})
module.exports = mongoose.model('User', userSchema);