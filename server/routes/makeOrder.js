const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// @route POST api/order
// @desc Create order
// @access Private

router.post("/", async (req, res) => {
  const { items, customer, isTakeAway, tax, totalAmount } = req.body;
  const { name, phone, address } = customer;
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
        ...customer
    })

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Add new Order successfully",
      order: newOrder,
    });

    const newPayment = new Payment({
        customer,
        items,
        tax,
        isTakeAway,
        totalAmount,
    })
    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Add new Schedule successfully",
      payment: newPayment,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;