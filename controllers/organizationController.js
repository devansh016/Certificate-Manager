const Organization = require("../models/organization");
const UserOrganization = require("../models/userOrganization");
const { v4: uuidv4 } = require('uuid');

async function createOrganization ({ userID, organizationName, organizationAbout, organizationWebsite }) {
    try {
        var organizationID = uuidv4();
        // Creating Organization
        const organization = new Organization({ "organizationID": organizationID, organizationName, organizationAbout, organizationWebsite });
        await organization.save();
        // Mapping it to user
        const userorganization = new UserOrganization({"organizationID": organizationID, "userID": userID});
        await userorganization.save();
        return { "status": 200, "message": "Organization created. " , "organizationID": organization.organizationID };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function deleteOrganization ({ userID, organizationID }){
    try {
        // Deleting Mapping
        // Delete Event, Template and Certificates
        const userorganization = await UserOrganization.findOne({ userID, organizationID });
        if(userorganization){
            await userorganization.deleteOne({ userID, organizationID});
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
        const userorganization = await UserOrganization.find({ userID });
        const organization = await Organization.find({ userorganization }, { organizationID: 1, organizationName: 1, organizationWebsite: 1, organizationAbout: 1 });
        return { "status": 200, "organization": organization };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function getOrganization ({ userID, organizationID }){
    try {
        const organization = await Organization.findOne({ userID, organizationID }, { organizationID: 1, organizationName: 1, organizationWebsite: 1, organizationAbout: 1 });
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