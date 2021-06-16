const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    text: { type: String, required: true },
    cardId:{type:Types.ObjectId,ref:"Card"}
});

module.exports = model('Activity', schema);