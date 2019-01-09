const mongoose = require('mongoose');

const robeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  patterns: [
    {
      type: String
    }
  ],
  price: {
    type: Number,
    required: true
  },
  colors: [
    {
      type: String,
      required: true
    }
  ],
  sizes: [
    {
      type: String,
      required: true
    }
  ],
  images: [
    {
      type: String,
      required: true
    }
  ],
  forMen: {
    type: Boolean,
    required: true
  }
});

const Robe = mongoose.model('Robe', robeSchema);

module.exports = Robe;
