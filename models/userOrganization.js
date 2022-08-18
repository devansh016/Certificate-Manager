const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOrganizationSchema = new Schema({
    organizationID: { type: String, required: true },
    userID: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

userOrganizationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
        delete ret.createdDate;
    }
});

module.exports = mongoose.model('User Organization', userOrganizationSchema);