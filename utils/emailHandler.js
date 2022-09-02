
const nodemailer = require("nodemailer");
require('dotenv').config();

async function sendRegistrationMaIL({sitename , submission, emailReceiver }) {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
        },
        tls: {rejectUnauthorized: false}
    });
    const text = 'Hello'

    let info = await transporter.sendMail({
        "from": "Form Clip <hello@formclip.xyz>",
        "to": emailReceiver, 
        "subject": "New Submission on Site " + sitename,
        "text": text,
    });
    console.log("Message sent: %s", info.messageId);
}

async function sendAccessKey({ accessKey, emailReceiver }) {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
        },
        tls: {rejectUnauthorized: false}
    });
    const text = 'fdg';
    
    let info = await transporter.sendMail({
        "from": "Form Clip <hello@formclip.xyz",
        "to": emailReceiver, 
        "subject": "Welcome to FormClip!",
        "text": text,
    });
    console.log("Message sent: %s", info.messageId);
}

module.exports ={
    sendSubmissionEmail,
    sendAccessKey
}