require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const ownerRouter = require('./routes/owner');

const authJwt = require('./middleware/auth');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.me3ch.mongodb.net/web-admin?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected")
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();


app.use(express.json());
//app.use(cors());
app.use('/api/auth', authRouter);

app.use('/api/home/', ownerRouter);

//app.use('/api/staff');

app.get('/api/home/', (req, res) => {
  return res.send("Hello staff");
})
// app.get('/api/auth/login', (req, res) => {
//   console.log("This is",req.header('Authorization'));
//   return res.send("Hello");
// })

// app.get('/api/auth', (req, res) => {
//   console.log("This is",req.header('Authorization'));
//   return res.send("Hello:");
// })

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
