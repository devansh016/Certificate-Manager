const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    certificateID : { type: String, unique: true, required: true },
    templateID: { type: String, required: true },
    organizationID: { type: String, required: true },
    path: { type: String, required: true },
    certificateNumber: { type: Number },
    recipient :{
        name: {type: String },
        email: { type: String }
    },
    createdDate: { type: Date, default: Date.now }
});

certificateSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.createdDate;
    }
});

module.exports = mongoose.model('Certificate', certificateSchema);