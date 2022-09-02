const Template = require("../models/template");
const UserOrganization = require("../models/userOrganization");
const Event = require("../models/event");
const { v4: uuidv4 } = require('uuid');

async function createTemplate ({ eventID, userID, templateName, coordinates}){
    try {
        // Find event
        const event = await Event.findOne({ eventID });
        if(!event)
            return { "status": 404, "message": "Event not found." };
        // Check user have acccess to event
        const userorganization = await UserOrganization.findOne({ userID, "organizationID": event.organizationID });
        if(!userorganization)
            return { "status": 403, "message": "Not authorized for this event." };
        // Creating template
        const templateID = uuidv4();
        const template = new Template ({ templateName, eventID, "templateID": templateID, "organizationID": event.organizationID, coordinates});
        await template.save();
        return { "status": 200, "message": "Template created.", "templateID": templateID };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function uploadTemplateDesign ({ templateID, userID, path}){
    try {
        // Find Organization of Template
        const template = await Template.findOne({ templateID });
        if(!template)
            return { "status": 404, "message": "Template not found." };
        // Check user have acccess to organization
        const userorganization = await UserOrganization.find({ userID, "organizationID": template.organizationID });
        if(!userorganization)
            return { "status": 403, "message": "Not authorized for this organization." };

        // Updating template
        template.path = path;
        await template.save();
        return { "status": 200, "message": "Design Upload.", "templateID": template.templateID };
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}



module.exports = {
    createTemplate,
    uploadTemplateDesign
}