const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model")
const { authUser } = require("./authentication.router");

router.route("/")
  .get(authUser, async (req, res) => {
    try {
      const user = await User.find({ email: req.email });
      const address = user[0].address;
      res.json({ success: true, address })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get address items", errorMessage: err.message })
    }
  })
  .post(authUser, async (req, res) => {
    try {
      let { address } = req.body;
      await User.findOneAndUpdate({ email: req.email }, { $push: { address: { ...address } } });
      let user = await User.find({ email: req.email });
      const useraddress = user[0].address;
      res.json({ success: true, address: useraddress })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update address", errorMessage: err.message })
    }
  })

router.route("/:id")
  .delete(authUser, async (req, res) => {
    try {
      const { id } = req.params
      await User.updateOne(
        { email: req.email },
        { $pull: { 'address': { _id: id } } });
      let user = await User.find({ email: req.email });
      const address = user[0].address;
      res.json({ success: true, address })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to update address", errorMessage: err.message })
    }
  })

module.exports = router