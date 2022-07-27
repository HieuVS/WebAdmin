const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
const Payment = require("../models/Payment");
const { getLatest7Days, formatDate } = require("../utils/getLatest7days");

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

// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const payment = await Payment.findOne({ _id: req.params.id });
//     if (!payment)
//       res.status(404).json({ success: false, message: "No payment found" });

//     res.status(200).json({ success: true, payment });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error!" });
//   }
// });

// @route GET api/payment/tablePerWeek
// @desc Get tablePerWeek
// @access Private

router.get("/tablePerWeek", verifyToken, async (req, res) => {
  const week = getLatest7Days();
  //console.log('Week', week)
  try {
    const paymentPerWeek = await Payment.find({
      createAt: {
        $gte: week[0],
        $lt: week[6]
      },
      isTakeAway: false
    });
    if (!paymentPerWeek)
    res.status(404).json({ success: false, message: "No payment found" });
    
    var weekOfPayment = [];
    for(let i = 0 ; i < 7; i++) {
      let count = paymentPerWeek.filter(item => formatDate(item.createAt) === formatDate(week[i]));
      weekOfPayment.push({count: count.length, day: formatDate(week[i])})
    }

    res.status(200).json({ success: true, weekOfPayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/payment/orderPerWeek
// @desc Get order Per Week
// @access Private

router.get("/orderPerWeek", verifyToken, async (req, res) => {
  const week = getLatest7Days();
  //console.log('Week', week)
  try {
    const paymentPerWeek = await Payment.find({
      createAt: {
        $gte: week[0],
        $lt: week[6]
      },
      isTakeAway: true
    });
    if (!paymentPerWeek)
    res.status(404).json({ success: false, message: "No payment found" });
    
    var weekOfPayment = [];
    for(let i = 0 ; i < 7; i++) {
      let count = paymentPerWeek.filter(item => formatDate(item.createAt) === formatDate(week[i]));
      weekOfPayment.push({count: count.length, day: formatDate(week[i])})
    }

    res.status(200).json({ success: true, weekOfPayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/payment/amountPerWeek
// @desc Get order Per Week
// @access Private

router.get("/amountPerWeek", verifyToken, async (req, res) => {
  const week = getLatest7Days();
  //console.log('Week', week)
  try {
    const paymentPerWeek = await Payment.find({
      createAt: {
        $gte: week[0],
        $lt: week[6]
      },
    });
    if (!paymentPerWeek)
    res.status(404).json({ success: false, message: "No payment found" });
    
    var totalAmountPerDay = [];
    for(let i = 0 ; i < 7; i++) {
      let filterPayment = paymentPerWeek.filter(item => formatDate(item.createAt) === formatDate(week[i]));
      let amountPerDay = filterPayment.reduce((accumulator, obj) => accumulator + obj.totalAmount,0);
      totalAmountPerDay.push({amountPerDay, day: formatDate(week[i])})
    }

    res.status(200).json({ success: true, totalAmountPerDay });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/payment/product
// @desc Get product
// @access Private

router.get("/product", verifyToken, async (req, res) => {

  try {
    const product = await Payment.find({});
    if (!product)
    res.status(404).json({ success: false, message: "No product found" });
    const productList = product.map(item=>item.items)
    const list = productList.flat(2)
    res.status(200).json({ success: true, productList: list });
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