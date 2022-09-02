const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    templateID: {type: String, unique: true, required: true },
    templateName: {type: String, required: true },
    organizationID: { type: String, required: true },
    eventID: { type: String, required: true },
    path: { type: String },
    coordinates: {
        name: {
            top: { type: Number },
            left: { type: Number }
        },
        certificateID: {
            top: { type: Number },
            left: { type: Number }
        },
    },
    createdDate: { type: Date, default: Date.now }
});

templateSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.createdDate;
    }
});

module.exports = mongoose.model('Template', templateSchema);