const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    templateID : {type: String, unique: true, required: true },
    eventID: { type: String, required: true },
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