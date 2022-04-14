const express = require("express");
const router = express.Router();
const Table = require("../models/Table");
const { verifyToken } = require("../middleware/auth");
// @route POST api/table
// @desc Create new table
// @access Private

router.post("/", [verifyToken], async (req, res) => {
  const { isActive, headcount, startAt, table } = req.body;
  if (isActive === false || !table)
    res.status(401).json({
      success: false,
      message: "Table's being used or table id is missing",
    });
  try {
    const newTable = new Table({
      isActive: true,
      headcount,
      startAt,
      endAt: "",
      table,
    });

    await newTable.save();
    res.status(200).json({
      success: true,
      message: "New table added successfully",
      table: newTable,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/table
// @desc Get table infomation
// @access Private

router.get("/", [verifyToken], async (req, res) => {
  try {
    const tableList = await Table.find({});
    if (!tableList)
      res.status(404).json({ success: false, message: "Table not found" });
    res.status(200).json({
      success: true,
      message: "Get Table list successfully",
      table: tableList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route PUT api/table/:id
// @desc UPDATE table infomation
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { isActive, headcount, endAt } = req.body;

  if (isActive === false)
    res.status(401).json({ success: false, message: "Table is not actived" });
  try {
    let updatedTable = {
      isActive: false,
      headcount,
      endAt: endAt || Date.now(),
    };

    updatedTable = await Table.findOneAndUpdate(
      { _id: req.params.id },
      updatedTable,
      { new: true }
    );
    if (!updatedTable)
      res.status(401).json({ success: false, message: "Table not found" });
    res.status(200).json({
      success: true,
      message: "Table updated successfully",
      table: updatedTable,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/table/:id
// @desc DELETE table infomation
// @access Private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedTable = await Table.findOneAndDelete({ _id: req.params.id });
    if (!deletedTable)
      res.status(401).json({ success: false, message: "Table not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Delete table successfully",
        TableId: req.params.id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
