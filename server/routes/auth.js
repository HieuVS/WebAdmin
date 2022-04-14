const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authJwt = require("../middleware/auth");

// @route GET api/auth
// @desc Check if user is loggedin
// @access Public
router.get('/', authJwt.verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if(!user) return res.status(400).json({success: false, message: "User Not Found"})
    res.status(200).json({success:true, user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
})


// @route POST api/auth/register
// @desc Register user
// @access Public

router.post("/register", async (req, res) => {
  const { username, password, isOwner } = req.body;
  console.log("request body: ", req.body);

  if (!username || !password)
    res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  try {
    const user = await User.findOne({ username: username });
    if (user)
      res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword, isOwner });

    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id, isOwner },
      process.env.AT_SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).json({ success: true, message: "Register successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

// @route POST /api/auth/login
// @desc Login User
// @access Public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  try {
    const user = await User.findOne({ username });
    if (!user)
      res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password or password" });

    const accessToken = jwt.sign(
      { userId: user._id, isOwner: user.isOwner },
      process.env.AT_SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Login successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;
