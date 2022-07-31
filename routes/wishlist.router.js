const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(authUser, async (req, res) => {
    try {
      const user = await User.find({ email: req.email });
      const wishlist = user[0].wishlist;
      res.json({ success: true, wishlist })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get wishlist items", errorMessage: err.message })
    }
  })
  .post(authUser, async (req, res) => {
    try {
      let { product } = req.body;
      await User.findOneAndUpdate({ email: req.email }, { $push: { wishlist: {...product} } });
      let user = await User.find({ email: req.email });
      const wishlist = user[0].wishlist;
      res.json({ success: true, wishlist })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update wishlist", errorMessage: err.message })
    }
  })

router.route("/:id")
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await User.updateOne(
        { email: req.email },
        { $pull: { 'wishlist': { _id: id } } });
      let user = await User.find({ email: req.email });
      const wishlist = user[0].wishlist;
      res.json({ success: true, wishlist })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update wishlist", errorMessage: err.message })
    }
  })

module.exports = router