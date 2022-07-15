const express = require("express");
const router = express.Router();
const Category = require('../models/Category');
const { verifyToken, isOwner } = require("../middleware/auth");
const fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

// @route POST api/item
// @desc Create item
// @access Private

router.post("/", [ verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });
  const { type } = req.body;
  if (!type)
    res
      .status(401)
      .json({ success: false, message: "Type is required" });

  try {
    const category = await Category.findOne({ type });
    if (category)
      res.status(401).json({ success: false, message: "Duplicated category" });

    const newType = new Category({
      type,
    });

    await newType.save();
    res.status(200).json({
      success: true,
      message: "Add new category successfully",
      type: newType,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/item
// @desc get item list
// @access Private

router.get("/", [verifyToken], async (req, res) => {
  // if (!req.isOwner)
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Need Owner permission" });
  try {
    const category = await Category.find({});
    if (!category)
      res.status(404).json({ success: false, message: "No type found" });
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});


// @route DELETE api/item/:id
// @desc Delete an item by id
// @access Private

router.delete("/:id", [verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });
  try {
    const deletedType = await Category.findOneAndDelete({ _id: req.params.id });
    if (!deletedType)
      res
        .status(401)
        .json({ success: false, message: "Type not found or already deleted" });

    res.status(200).json({
      success: true,
      message: "Delete type successfully",
      typeId: req.params.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
