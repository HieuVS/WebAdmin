const express = require("express");
const { verifyToken, isOwner } = require("../middleware/auth");
const router = express.Router();
const Staff = require("../models/Staff");
const crypto = require("crypto");

// @route POST api/staff
// @desc Create staff
// @access Private

router.post("/", [verifyToken, isOwner], async (req, res) => {
  const { name, age, phone } = req.body;
  if (!name)
    res
      .status(401)
      .json({ success: false, message: "Staff's name is required" });

  var id = "A" + crypto.randomBytes(3).toString("hex").toUpperCase();
  try {
    const newStaff = new Staff({
      name,
      age,
      phone,
      maNV: id,
    });
    await newStaff.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Add new Staff successfully",
        staff: newStaff,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/staff
// @desc GET all staff
// @access Private

router.get("/", [verifyToken, isOwner], async (req, res) => {
  try {
    const staffs = await Staff.find({});

    res.status(200).json({ success: true, staffs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

router.put("/:id", [verifyToken, isOwner], async (req, res) => {
  const { name, age, phone } = req.body;
  if (!name)
    res
      .status(401)
      .json({ success: false, message: "Staff's name is required" });

  try {
    let updatedStaff = {
      name,
      age,
      phone,
    };

    updatedStaff = await Staff.findOneAndUpdate(
      { _id: red.params.id },
      updatedStaff,
      { new: true }
    );

    if (!updatedStaff)
      res
        .status(401)
        .json({
          success: false,
          message: "Staff not found or user not authorized",
        });
    res.status(200).json({success: true, message: "Update staff successfully", staff: updatedStaff})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
