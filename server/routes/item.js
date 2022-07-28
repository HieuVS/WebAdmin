const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const { verifyToken, isOwner } = require("../middleware/auth");
const fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
  
var upload = multer({ storage: storage }).single('image');
// @route POST api/item
// @desc Create item
// @access Private

router.post("/", [ upload, verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
  return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });
      console.log('REQUSET    2:', req.body)
      
  const { name, description, price, image, stock, isTax, category } = req.body;

  if (!name)
    res
      .status(401)
      .json({ success: false, message: "Item's name is required" });
  const tax = isTax === 'Yes' ? true : false;
  try {
    const item = await Item.findOne({ name });
    if (item)
      res.status(401).json({ success: false, message: "Duplicated Item" });

    const checkImage = image ? image : {
      data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
      contentType: 'image/png'
    }

    const newItem = new Item({
      name,
      description,
      price,
      image : checkImage,
      stock,
      tax,
      category,
    });

    await newItem.save();
    res.status(200).json({
      success: true,
      message: "Add new item successfully",
      item: newItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/item
// @desc get item list
// @access Private

router.get("/", async (req, res) => {
  // if (!req.isOwner)
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Need Owner permission" });
  try {
    const itemList = await Item.find({});
    if (!itemList)
      res.status(404).json({ success: false, message: "No item found" });
    res.status(200).json({ success: true, itemList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route PUT api/item/:id
// @desc Update an item by id
// @access Private

router.put("/:id", [upload, verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });
  console.log('REQUSET    2:', req.body)

  const { name, description, price, image, stock, isTax, category } = req.body;
  console.log('REQUSET    2:', req.body)
  const tax = isTax === 'Yes' ? true : false;
  if (!name)
    res
      .status(401)
      .json({ success: false, message: "Item's name is required" });
  try {
    let updatedItem = {
      name,
      description,
      price,
      image : {
        data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
        contentType: 'image/png'
      },
      stock,
      tax,
      category
    };
    console.log('updatedItem ',updatedItem)
    updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id },
      updatedItem,
      { new: true }
    );
    if (!updatedItem)
      res.status(401).json({ success: false, message: "Item not found" });
    res.status(200).json({
      success: true,
      message: "Update Item successfully",
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route PUT api/item/:id
// @desc Update an item by id
// @access Private
// router.put("/:id/:reduce", [verifyToken, isOwner], async (req, res) => {
//   if (!req.isOwner)
//     return res
//       .status(401)
//       .json({ success: false, message: "Need Owner permission" });
//   try {
//     await Item.findOneAndUpdate(
//       { _id: req.params.id },
//       { $inc: { stock: -req.params.reduce } }
//     );
//     console.log("SUA STOCK: ", req.params.reduce);
//     //console.log("A :",a)
//     // if (!updatedItem)
//     //   res.status(401).json({ success: false, message: "Item not found" });

//     res
//       .status(200)
//       .json({ success: true, message: "Update Item successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error!" });
//   }
// });

// @route DELETE api/item/:id
// @desc Delete an item by id
// @access Private

router.delete("/:id", [verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem)
      res
        .status(401)
        .json({ success: false, message: "Item not found or already deleted" });

    res.status(200).json({
      success: true,
      message: "Delete item successfully",
      itemId: req.params.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
