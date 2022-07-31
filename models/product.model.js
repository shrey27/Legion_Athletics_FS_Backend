const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  _id: String,
  source: String,
  title: String,
  price: Number,
  mrp: Number,
  discount: Number,
  rating: Number,
  count: Number,
  nostock: Boolean,
  fastdelivery: Boolean,
  category: String,
  description: String,
  type: String,
  size: String,
});
const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
