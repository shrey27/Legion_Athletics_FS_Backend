const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(authUser, async (req, res) => {
    try {
      const user = await User.find({ email: req.email });
      const cart = user[0].cart;
      res.json({ success: true, cart })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get cart items", errorMessage: err.message })
    }
  })
  .post(authUser, async (req, res) => {
    try {
      let { product } = req.body;
      await User.findOneAndUpdate({ email: req.email }, { $push: { cart: { ...product } } });
      let user = await User.find({ email: req.email });
      const cart = user[0].cart;
      res.json({ success: true, cart })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update cart", errorMessage: err.message })
    }
  })

router.route("/all")
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await User.updateOne(
        { email: req.email },
        { $set: { 'cart': [] } });
      res.json({ success: true, cart: [] })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update cart", errorMessage: err.message })
    }
  })

router.route("/:id")
  .put(authUser, async (req, res) => {
    try {
      const { id } = req.params
      const { action: { type } } = req.body
      await User.updateOne({ email: req.email, "cart._id": id },
        { $inc: { "cart.$.count": type === 'increment' ? 1 : -1 } })
      let user = await User.find({ email: req.email });
      const cart = user[0].cart;
      res.json({ success: true, cart })
    } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, message: "Unable to update cart", errorMessage: err.message })
    }
  })
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await User.updateOne(
        { email: req.email },
        { $pull: { 'cart': { _id: id } } });
      let user = await User.find({ email: req.email });
      const cart = user[0].cart;
      res.json({ success: true, cart })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update cart", errorMessage: err.message })
    }
  })

module.exports = router