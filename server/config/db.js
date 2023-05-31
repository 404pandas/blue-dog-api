const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

module.exports = mongoose.connection;
