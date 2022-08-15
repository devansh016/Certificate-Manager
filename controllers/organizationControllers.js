const Organization = require("../models/organizationModel");
const User = require("../models/userModel");
const crypto = require("crypto");

async function createOrganization ({ userID, organizationName, organizationAbout, organizationWebsite }) {
    try {
        const organization = new Organization({ "organizationID": crypto.randomBytes(12).toString('hex'), userID, organizationName, organizationAbout, organizationWebsite });
        await organization.save();
        return { "status": 200, "message": "Organization created. " , "organizationID": organization.organizationID };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function deleteOrganization ({ userID, organizationID }){
    try {
        const organization = await Organization.findOne({ userID, organizationID });
        if(organization){
            await Organization.deleteOne({ userID, organizationID});
            return { "status": 200, "message": "Organization deleted." };
        } else {
            return { "status": 404, "message": "Organization not found." };
        }
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function getAllOrganization ({ userID }){
    try {
        const organization = await Organization.find({ userID });
        return { "status": 200, "organization": organization };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function getOrganization ({ userID, organizationID }){
    try {
        const organization = await Organization.findOne({ userID, organizationID });
        if(organization){
            return { "status": 200,  "organization": organization };
        } else {
            return { "status": 404, "message": "Organization not found." }
        }
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

module.exports ={
    createOrganization,
    deleteOrganization,
    getOrganization,
    getAllOrganization
}