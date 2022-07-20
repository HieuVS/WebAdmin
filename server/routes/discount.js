const express = require("express");
const { verifyToken, isOwner } = require("../middleware/auth");
const router = express.Router();
const Discount = require("../models/Discount");

// @route POST api/discount
// @desc Create new discount
// @access Private

router.post("/", [verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });

  const { code, discountCent } = req.body;
  if (!code || !discountCent)
    res
      .status(401)
      .json({ success: false, message: "Code and discount is required" });
  const discount = discountCent/100;
  try {
    const newDiscount = new Discount({
      code,
      discount,
    });
    await newDiscount.save();
    res.status(201).json({
      success: true,
      message: "add new Discount successfully",
      discount: newDiscount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route GET api/discount
// @desc GET discount list
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const discountList = await Discount.find({});

    res.status(200).json({ success: true, discountList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route PUT api/discount/:id
// @desc Update discount
// @access Private

// router.put("/:id", [verifyToken, isOwner], async (req, res) => {
//   if (!req.isOwner)
//     return res
//       .status(401)
//       .json({ success: false, message: "Need Owner permission" });

//   const { code, discount } = req.body;
//   if (!code || !discount)
//     res
//       .status(401)
//       .json({ success: false, message: "Code and discount is required" });

//   const updateCondition = { _id: req.params.id };
//   try {
//     let updatedDiscount = {
//       code,
//       discount,
//     };

//     updatedDiscount = await Discount.findOneAndUpdate(
//       updateCondition,
//       updatedDiscount,
//       { new: true }
//     );

//     if (!updatedDiscount)
//       res.status(401).json({ success: false, message: "Discount not found" });

//     res.status(200).json({
//       success: false,
//       message: "Update discount successfully",
//       discount: updatedDiscount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error!" });
//   }
// });

// @route DELETE api/discount/:id
// @desc DELETE discount
// @access Private

router.delete("/:id", [verifyToken, isOwner], async (req, res) => {
  if (!req.isOwner)
    return res
      .status(401)
      .json({ success: false, message: "Need Owner permission" });
  try {
    const deleteCondition = { _id: req.params.id };

    const deletedDiscount = await Discount.findOneAndDelete(deleteCondition);
    if (!deletedDiscount)
      res.status(401).json({ success: false, message: "Discount not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Delete discount successfully",
        discountId: req.params.id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;