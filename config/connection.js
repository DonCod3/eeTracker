// let Sequelize = require('sequelize');

// //  protocol:// username:password@localhost:port/database
// // const URI = `mysql2://root:Super98!@localhost:3306/bootcamp`
// const URI = process.env.MYSQLURI

// const sequelize = new Sequelize(URI);
// module.exports = sequelize;

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
