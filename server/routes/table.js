const express = require("express");
const router = express.Router();
const Table = require("../models/Table");
const { verifyToken } = require("../middleware/auth");
// @route POST api/table
// @desc Create new table
// @access Private

router.post("/", [verifyToken], async (req, res) => {
  const { isActive, headCount, startAt, number } = req.body;
  if (isActive === true || !number)
    res.status(401).json({
      success: false,
      message: "Table's being used or table id is missing",
    });
  try {
    const newTable = new Table({
      isActive: true,
      headCount,
      startAt,
      number,
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
  const { active, headCount, startAt, number  } = req.body;

  if (active === undefined)
    res.status(401).json({ success: false, message: "isActive is required" });
  let isActive = active === 'true' ? true : false
  try {
    let updatedTable = {
      isActive,
      headCount,
      startAt,
      number,
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

// @route PUT api/table/payment/:id
// @desc UPDATE table infomation
// @access Private

router.put("/payment/:id", verifyToken, async (req, res) => {
  const { isActive, headCount, startAt, number  } = req.body;

  if (isActive === false)
    res.status(401).json({ success: false, message: "Table is not actived" });
  try {
    let updatedTable = {
      isActive: false,
      headCount,
      startAt,
      number,
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
