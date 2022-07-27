const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// @route POST api/order
// @desc Create order
// @access Private

router.post("/", async (req, res) => {
  const { items, name, phone, address, isTakeAway } = req.body;
  if (!phone)
    res
      .status(401)
      .json({ success: false, message: "Phone is required" });
    if (!address && !name)
      res.status(401).json({
        success: false,
        message: "address and name is required for takeaway",
      });
  

  try {
    const newOrder = new Order({
        items,
        isTakeAway: isTakeAway,
        name,
        phone,
        address,
    })

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Add new Order successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;