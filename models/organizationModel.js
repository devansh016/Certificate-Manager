const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    organizationID: { type: String, unique: true, required: true },
    userID: { type: String, required: true },
    organizationName: { type: String, required: true },
    organizationAbout: { type: String },
    organizationWebsite: { type: String },
    createdDate: { type: Date, default: Date.now }
});

organizationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.createdDate;
        delete ret.userID;
    }
});

organizationSchema.methods = {
    getOrganization: function() { 
        return {
            "organizationID" : this.organizationID,
            "name": this.organizationName,
            "about": this.organizationAbout,
            "website": this.organizationWebsite
        };
    }
}

module.exports = mongoose.model('Organization', organizationSchema);