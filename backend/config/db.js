const mongoose = require("mongoose");
// https://mongoosejs.com/docs/connections.html#error-handling
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connecté à Mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
