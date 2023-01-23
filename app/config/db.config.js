require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
  let db_connection = `mongodb+srv://${process.env.HOST}:${process.env.PASSWORD_DB}@cluster1.ekiux.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
  return mongoose.connect(
    db_connection,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },

    (err) => {
      if (err) {
        console.log("error in connection");
        process.exit();
      } else {
        console.log("mongodb is connected");
      }
    }
  );
};

module.exports = connection;
