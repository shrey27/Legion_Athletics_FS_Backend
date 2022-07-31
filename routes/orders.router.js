const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(authUser, async (req, res) => {
    try {
      const user = await User.find({ email: req.email });
      const orders = user[0].orders;
      res.json({ success: true, orders })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get ordered items", errorMessage: err.message   })
    }
  })
  .post(authUser, async (req, res) => {
    try {
      let { order } = req.body;
      await User.findOneAndUpdate({ email: req.email }, { $push: { orders: { ...order } } });
      let user = await User.find({ email: req.email });
      const orders = user[0].orders;
      res.json({ success: true, orders })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update orders list", errorMessage: err.message })
    }
  })

module.exports = router