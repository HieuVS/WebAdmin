const express = require("express");
const { verifyToken, isOwner } = require("../middleware/auth");
const router = express.Router();
const Charge = require("../models/Charge");

// @route POST api/charge
// @desc Create new charge
// @access Private
router.post("/", [verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });

  const { type, fee } = req.body;
  if (!type || !fee)
    res
      .status(401)
      .json({ success: false, message: "type and fee is required" });

  try {
    const newCharge = new Charge({
      type,
      fee,
    });
    await newCharge.save();
    res.status(201).json({
      success: false,
      message: "Create new charge successfully",
      charge: newCharge,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/charge
// @desc GET charge list
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const chargeList = await Charge.find({});

    res.status(200).json({ success: true, chargeList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route DELETE api/charge/:id
// @desc DELETE charge
// @access Private
router.delete("/:id", [verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });

  try {
    const deleteCondition = { _id: req.params.id };  
    const deletedCharge = await Charge.findOneAndDelete(deleteCondition);
    if (!deletedCharge)
      res.status(401).json({ success: false, message: "Charge not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Delete charge successfully",
        chargeId: req.params.id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;