const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventID : {type: String, unique: true, required: true },
    organizationID: { type: String, required: true },
    eventName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

eventSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.createdDate;
        delete ret.userID;
    }
});

module.exports = mongoose.model('Event', eventSchema);