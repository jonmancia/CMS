const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  id: String,
  subject: String,
  msgText: String,
  sender: String
});

module.exports = mongoose.model("Message", messageSchema);
