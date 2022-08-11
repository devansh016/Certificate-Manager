const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    organizationID: { type: String, unique: true, required: true },
    userID: { type: String, required: true },
    organizationName: { type: String, required: true },
    verifed: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

organizationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.verifed;
        delete ret.createdDate;
        delete ret.userID;
    }
});

module.exports = mongoose.model('Organization', organizationSchema);