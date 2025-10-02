const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  isDelete: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Role", roleSchema);
