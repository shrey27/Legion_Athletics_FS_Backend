const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: Number,
  signUpAddress: String,
  wishlist: Array,
  cart: Array,
  address: Array,
  orders: Array
});
const User = mongoose.model('Users', UserSchema);

module.exports = { User };
