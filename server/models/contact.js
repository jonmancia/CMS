const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  imageUrl: String,
  group: [{ type: Schema.Types.ObjectId, ref: "Contact" }]
});

module.exports = mongoose.model("Contact", contactSchema);
