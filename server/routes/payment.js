const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
const Payment = require("../models/Payment");

// @route POST api/payment
// @desc Create payment
// @access Private

router.post("/", verifyToken, async (req, res) => {
  const { items, charge, discount, totalAmount, tax, isTakeAway, customer } = req.body;

  if (!items)
    res.status(401).json({ success: false, message: "Items are required" });

  try {
    const newPayment = new Payment({
      items,
      charge,
      discount,
      totalAmount,
      tax,
      isTakeAway,
      customer,
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Add new payment successfully",
      payment: newPayment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/payment
// @desc Get payment
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const paymentList = await Payment.find({});
    if (!paymentList)
      res.status(404).json({ success: false, message: "No payment found" });

    res.status(200).json({ success: true, paymentList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/payment/:id
// @desc Get payment
// @access Private

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const payment = await Payment.findOne({ _id: req.params.id });
    if (!payment)
      res.status(404).json({ success: false, message: "No payment found" });

    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route DELETE api/payment/:id
// @desc DELETE payment
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id };
    const deletePayment = await Payment.findOneAndDelete(deleteCondition);

    if (!deletePayment)
      res.status(401).json({ success: false, message: "No payment found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Payment deleted successfully",
        paymentId: req.params.id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;