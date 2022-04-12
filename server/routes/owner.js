const express = require('express');
const router = express.Router();
const authJwt = require("../middleware/auth");

router.get('/owner', [authJwt.verifyToken, authJwt.isOwner], async (req, res) => {
    try {
        if(req.isOwner) res.status(200).send("Home page for Owner");
        else res.status(400).json({ success: false, message: "Require Owner Role"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
})

module.exports = router;