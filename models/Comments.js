const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  text: { type: String, required: true },
  userEmail: {
    type: String,ref:'User'
  },
  cardId: {
    type: Types.ObjectId,
    ref: "Card",
  },
});

module.exports = model("Comments", schema);
