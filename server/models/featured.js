const mongoose = require('mongoose');

const featuredItemsSchema = new mongoose.Schema({
  robeRef: {
    type: String
  }
});

const FeaturedItems = mongoose.model('FeaturedItems', featuredItemsSchema);

module.exports = FeaturedItems;
