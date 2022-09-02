const UserOrganization = require("../models/userOrganization");
const Event = require("../models/event");
const { v4: uuidv4 } = require('uuid');

async function createEvent ({ organizationID, eventName, description }){
    try {
        const eventID = uuidv4();
        const event = new Event ({ organizationID, eventName, "eventID": eventID, description });
        await event.save();
        return { "status": 200, "message": "Event created.", "eventID": eventID };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function getAllEvent ({ userID,  organizationID}) {
    try {
        // Check Access to Organization
        const userorganization = await UserOrganization.find({ userID, organizationID});
        if(!userorganization)
            return { "status": 403, "message": "Not authorized for this organization." };
        // Get Events
        const event = await Event.find({ organizationID }, { eventID: 1, eventName: 1, description: 1});
        return { "status": 200, "event": event };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function getEvent ({ userID, organizationID, eventID}){
    try {
        // Check Access to Organization
        const userorganization = await UserOrganization.findOne({ userID, organizationID});
        if(!userorganization)
            return { "status": 403, "message": "Access denied to the organization." }
        // Get Event
        const event = await Event.findOne({ organizationID, eventID }, { eventID: 1, eventName: 1, description: 1});
        return { "status": 200, "event": event };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function deleteEvent ({ userID, eventID }){
    try {
        // Check if event exists
        const event = await Event.findOne({ eventID }, { "organizationID": 1});
        if(!event)
            return { "status": 404, "message": "Event not found." };
        // Check if user has access to the event
        const userorganization = await UserOrganization.findOne({ userID, "organizationID": event.organizationID });
        if(!userorganization)
            return { "status": 403, "message": "Access denied to the organization." };
        // Delete Event
        await Event.deleteOne({ "organizationID": event.organizationID, eventID });
        return { "status": 200, "message": "Organization deleted." };
    } catch (error) {
        console.log(error);
        return { "status": 500, "message": error.message };
    }
}

module.exports = {
    createEvent,
    getAllEvent,
    getEvent,
    deleteEvent
}