const mongoose = require("mongoose");
const DB_URL = process.env.DB_URI || "mongodb://localhost:27017/auth-api";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Mongodb connected."))
  .catch(err => console.log(`Mongo Error: ${err}`));

module.exports = {
  User: require("./User")
};
