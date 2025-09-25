const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name không được để trống"],
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
