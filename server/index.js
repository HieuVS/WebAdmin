require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const ownerRouter = require('./routes/owner');
const staffRouter = require('./routes/staff');
const itemRouter = require('./routes/item');
const tableRouter = require('./routes/table');
const orderRouter = require('./routes/order');
const chargeRouter = require('./routes/charge');
const discountRouter = require('./routes/discount');
const paymentRouter = require('./routes/payment');

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
//api for login, register
app.use('/api/auth', authRouter);

//app.use('/api/home/', ownerRouter);

//api for staff
app.use('/api/staff', staffRouter);

//api for item
app.use('/api/item', itemRouter);

//api for table
app.use('/api/table',tableRouter);

//api for order
app.use('/api/order', orderRouter);

//api for charge
app.use('/api/charge', chargeRouter);

//api for discount
app.use('/api/discount', discountRouter);

//api for payment
app.use('/api/payment', paymentRouter);

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
