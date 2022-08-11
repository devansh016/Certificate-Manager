const Organization = require("../models/organizationModel");
const User = require("../models/userModel");
const crypto = require("crypto");

async function createOrganization ({ userID, organizationName }){
    const organization = new Organization({ "organizationID": crypto.randomBytes(8).toString('hex'), userID, organizationName });
    await organization.save();
    return { "status": 200, "message": "Organization Created." };
}

async function deleteOrganization ({ userID, organizationID }){
    const organization = await Organization.findOne({ userID, organizationID });
    if(organization){
        await Organization.deleteOne({ userID, organizationID});
        return { "status": 200, "message": "Organization Deleted." };
    } else {
        return { "status": 404, "message": "Not found." }
    }
}

async function getAllOrganization ({ userID }){
    const organization = await Organization.find({ userID });
    return { "status": 200, organization };
}

async function getOrganization ({ userID, organizationID }){
    const organization = await Organization.findOne({ userID, organizationID });
    if(organization){
        return { "status": 200, organization };
    } else {
        return { "status": 404, "message": "Not found." }
    }
}

module.exports ={
    createOrganization,
    deleteOrganization,
    getOrganization,
    getAllOrganization
}