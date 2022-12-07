const mongoose = require("mongoose");
var mysql = require("mysql");

const connect = async () => {
  mongoose
    .connect(
      `mongodb+srv://n18dcat069-shopee:n18dcat069-shopee@cluster0.rpxyi.mongodb.net/shopee`
      //   `mongodb+srv://<user>:<password>@cluster0.rpxyi.mongodb.net/<Tên database>`
      // `mongodb://localhost:27017/shopee`
    )
    .then(() => {
      console.log("Ket noi database thanh cong");
    })
    .catch((error) => {
      console.log("Ket noi database that bai " + error);
    });
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

con.connect(function (err) {
  if (err) {
    console.log("Error when connect to MySql: " + err);
  } else console.log("Mysql Connected Successful");
});

module.exports = { connect, con };
