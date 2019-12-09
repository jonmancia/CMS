const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  id: String,
  name: String,
  description: String,
  url: String
});

module.exports = mongoose.model("Document", documentSchema);
