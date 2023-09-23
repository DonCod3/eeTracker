require('dotenv').config()

const inquirer = require("inquirer");
const { getDepartment, addDepartment, deleteDepartment } = require("./routes/department");
const { getEmployee, addEmployee, deleteEmployee } = require("./routes/employee");
const { getRoles, addRole, deleteRole } = require("./routes/role");

const express = require("express");
// const sequelize = require('./config/connection');
const db = require("./config/connection");

//Import and require mySQL2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express()

//middleware
app.use(express.urlencoded({ extended: false }));

//connect to database

// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
// });


db.connect(err => {
    if(err) throw err;
    console.log(`Connected on port ${PORT}!`);
});


  