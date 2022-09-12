const Template = require("../models/template");
const UserOrganization = require("../models/userOrganization");
const Certificate = require("../models/certificate")
const { jsPDF } = require("jspdf")
const imageToBase64 = require('image-to-base64')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

async function certificateGenerationRequest ({ templateID, userID, CSVfile }){
    try {
        // Find template
        const template = await Template.findOne({ templateID });
        if(!template)
            return { "status": 404, "message": "Template not found." };
        // Check user have acccess to event
        const userorganization = await UserOrganization.findOne({ userID, "organizationID": template.organizationID });
        if(!userorganization)
            return { "status": 403, "message": "Not authorized for this event." };

        // Create Directory for certificates
        folderName = path.join(__dirname, "../public/certificates/")
        if (!fs.existsSync(folderName)){
            fs.mkdirSync(folderName);
        }
        	
        // Reading CSV file
        fs.createReadStream(CSVfile)
        .pipe(csv())
        .on('data', (row) => {
            makeCertificate({ "name": row.name, "email": row.email, template })
        })
        .on('end', () => {
            return { "status": 200, "message": "Certificates Generated."};
        });
        return { "status": 200, "message": "Certificates Generated."};
    } catch (error) {
        return { "status": 500, "message": error.message };
    }
}

async function makeCertificate({name, email, template}){

    var certificateID = uuidv4();
	// Creating a blank pdf
	var doc = new jsPDF({
		orientation: 'landscape'
	})
	var filetype = template.path.split(".");
    filetype = filetype[filetype.length-1];
	var imgData = 'data:image/' + filetype + ';base64,'+ await imageToBase64(template.path);
	doc.addImage(imgData, filetype, 0, 0, 297, 210,'','SLOW'); 

	// Adding Text and Saving
	doc.setFontSize(20);
	doc.setTextColor(0, 0, 0);
	// doc.setFont('arial', 'normal'); 
	doc.text(name, 40 , 50, null, null, 'center');

	// Adding certificate ID
	doc.setFontSize(14);
	doc.setTextColor(0,0,0);
	// doc.setFont("arial", 'normal');
	doc.text(certificateID, 260 , 204, null, null, 'center');

	var certiPath = path.join(__dirname, "../public/certificates/") + certificateID  + ".pdf"
	doc.save(certiPath);

	// Register Certificate in DB
	var certificate = new Certificate({
        certificateID,
        "templateID": template.templateID,
        "organizationID": template.organizationID,
        "path": certiPath,
        "recipient" : { name, email },
	})
	await certificate.save()
}

module.exports = {
    certificateGenerationRequest,
    makeCertificate
}