// //Import and require mySQL2
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Super98!",
        // database: "employee_tracker"
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
