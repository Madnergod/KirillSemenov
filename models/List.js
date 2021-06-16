const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    boardId: {
        type:Types.ObjectId,ref:'Board'
    }
});
module.exports = model('List', schema);