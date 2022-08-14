const Organization = require("../models/organizationModel");
const Event = require("../models/eventModel");
const crypto = require("crypto");

async function creatEvent ({ organizationID, eventName }){
    const event = new Event ({ organizationID, eventName, "eventID": crypto.randomBytes(8).toString('hex') });
    await event.save();
    return { "status": 200, "message": "Event Created." };
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

module.exports = {
    createOrganization,
    deleteOrganization,
    getOrganization,
    getAllOrganization
}