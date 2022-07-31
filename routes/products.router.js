const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model")

router.route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products })
    } catch (err) {
      res.status(500).json({ success: false, message: "Unable to get products", errorMessage: err.message })
    }
})

module.exports = router