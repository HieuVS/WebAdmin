const express = require("express");
const router = express.Router();
const Table = require("../models/Table");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

// @route POST api/table
// @desc Create new table
// @access Private

router.post("/", async (req, res) => {
  const { table, items, tax, customer, isTakeAway, totalAmount, tableId } = req.body;
  if (!req.body)
    res.status(401).json({
      success: false,
      message: "Loi client",
    });
  try {
    const newTable = new Table({
      isActive: true,
      ...table,
      tableId
    });

    await newTable.save();
    // res.status(200).json({
    //   success: true,
    //   message: "New table added successfully",
    //   table: newTable,
    // });

    const newOrder = new Order({
        items,
        isTakeAway: isTakeAway,
        ...customer,
        tableId
    })

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Add new Schdule successfully",
      order: newOrder,
      table: newTable,
    });

    // const newPayment = new Payment({
    //     customer,
    //     items,
    //     tax,
    //     isTakeAway,
    //     totalAmount,
    // })
    // await newPayment.save();

    // res.status(201).json({
    //   success: true,
    //   message: "Add new Schedule successfully",
    //   payment: newPayment,
    // });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;