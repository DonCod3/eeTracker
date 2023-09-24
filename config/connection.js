// //Import and require mySQL2
const mysql = require("mysql2");
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER ,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log("connected to the eeTracker database")
);

module.exports = db


// let seq = require('sequelize');

// //  protocol:// username:password@localhost:port/database
// // const URI = `mysql2://root:Super98!@localhost:3306/bootcamp`
// const URI = process.env.MYSQLURI

// const sequelize = new seq(URI);
// module.exports = sequelize;
