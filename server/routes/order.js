const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/auth");

// @route POST api/order
// @desc Create order
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { customerName, phone, address, items, checkTakeAway } = req.body;
  if (!phone)
    res
      .status(401)
      .json({ success: false, message: "Phone is required" });
  let isTakeAway = checkTakeAway === "takeaway" ? true : false;
  if (isTakeAway) {
    if (!address && !customerName)
      res.status(401).json({
        success: false,
        message: "address and customerName is required for takeaway",
      });
  }

  try {
    const newOrder = new Order({
      customerName,
      phone,
      address,
      items,
      isTakeAway,
    });

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

// @route GET api/order
// @desc GET order list
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const orderList = await Order.find({}).sort({createAt: 'desc'});
    res.status(200).json({ success: true, orderList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route PUT api/order/:id
// @desc Update order
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { customerName, phone, address, items, isTakeAway } = req.body;
  if (!phone)
    res
      .status(401)
      .json({ success: false, message: "Phone is required" });
  if (isTakeAway === true) {
    if (!address && !customerName)
      res.status(401).json({
        success: false,
        message: "address and customerName is required for takeaway",
      });
  }

  try {
    let updatedOrder = {
      customerName,
      phone,
      address,
      items,
      isTakeAway,
    };
    const updateCondition = { _id: req.params.id };
    updatedOrder = await Order.findOneAndUpdate(updateCondition, updatedOrder, {
      new: true,
    });

    if (!updatedOrder)
      res.status(401).json({ success: false, message: "Order not found" });
    res
      .status(200)
      .json({ success: true, message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route DELETE api/order/:id
// @desc DELETE order
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id };
    const deletedOrder = await Order.findOneAndDelete(deleteCondition);

    if (!deletedOrder)
      res.status(401).json({ success: false, message: "Order not found", orderId: req.params.id });
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      orderId: req.params.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;