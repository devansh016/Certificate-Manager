const { S3Client } = require('@aws-sdk/client-s3')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()

const s3 = new S3Client({
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
    accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: '2006-03-01',
    region: 'ap-south-1'
})

const uploadDesignfileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const uploadRecipientfileFilter = (req, file, cb) => {
    if (file.mimetype === "text/csv" ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only CSV is allowed!"), false);
    }
};

const uploadCertificatefileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf" ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only CSV is allowed!"), false);
    }
};

var fileID = uuidv4();

const uploadDesign = multer({
    uploadDesignfileFilter,
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            var fileextension = file.originalname.split(".")[1];
            cb(null, "template:" + fileID + "." + fileextension)
        },
    }),
})

const uploadCertificate = multer({
    uploadCertificatefileFilter,
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            var fileextension = file.originalname.split(".")[1];
            cb(null, "certificate:" + fileID + "." + fileextension)
        },
    }),
})


const recipientStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/recipients', 
      filename: (req, file, cb) => {
        var fileextension = file.originalname.split(".")[1];
        cb(null, "recipients:" + fileID + "." + fileextension)
    }
});

const uploadRecipient = multer({
    uploadRecipientfileFilter,
	storage: recipientStorage,
	limits: {
	  fileSize: 1000000 // 1000000 Bytes = 1 MB
	}
})

module.exports = {
    uploadDesign,
    uploadCertificate,
    uploadRecipient
};