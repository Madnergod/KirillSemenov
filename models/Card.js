const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String,required:true},
  description: { type: String},
  listId: {
    type: Types.ObjectId,
    ref: "List",
  },
  order:{
    type:Number
  }
});

module.exports = model("Card", schema);
