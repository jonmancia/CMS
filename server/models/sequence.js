const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
  maxDocumentId: String,
  maxMessageId: String,
  maxContactId: String
});

module.exports = mongoose.model("Sequence", sequenceSchema);
