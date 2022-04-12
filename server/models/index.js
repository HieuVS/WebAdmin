const mongoose = require('mongoose');

const db = {}

db.mongoose = mongoose;
db.user= require('./User');
db.role=require('./Role');

db.ROLES = ["staff", "owner"];

module.exports = db;