const express = require("express");
const { verifyToken, isOwner } = require("../middleware/auth");
const router = express.Router();
const Staff = require("../models/Staff");
const crypto = require("crypto");

// @route POST api/staff
// @desc Create staff
// @access Private

router.post("/", [verifyToken, isOwner], async (req, res) => {
  if(!req.isOwner) return res.status(401).json({success: false, message: "Need Owner permission"});

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
  if(!req.isOwner) return res.status(401).json({success: false, message: "Need Owner permission"});
  try {
    const staffs = await Staff.find({});

    res.status(200).json({ success: true, staffs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route PUT api/staff/:id
// @desc Update a staff's infomation
// @access Private

router.put("/:id", [verifyToken, isOwner], async (req, res) => {
  if(!req.isOwner) return res.status(401).json({success: false, message: "Need Owner permission"});
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
      { _id: req.params.id },
      updatedStaff,
      { new: true }
    );

    if (!updatedStaff)
      res
        .status(401)
        .json({
          success: false,
          message: "Staff not found",
        });
    res.status(200).json({success: true, message: "Update staff successfully", staff: updatedStaff})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/staff/:id
// @desc delete a staff's info
// @access Private

router.delete('/:id',[verifyToken,isOwner], async (req,res) => {
  if(!req.isOwner) return res.status(401).json({success: false, message: "Need Owner permission"});
  try {
    const deleteCondition = { _id: req.params.id };
    const deletedStaff = await Staff.findOneAndDelete(deleteCondition);

    if(!deletedStaff) res.status(401).json({success: false, message: "Staff not found"});

    res.status(200).json({success: true, message: "Delete staff successfully", staffId: req.params.id});
  } catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

module.exports = router;