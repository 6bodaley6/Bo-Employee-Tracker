console.log("hello");
const inquirer = require("inquirer");
const mySql = require("mysql2");
require("dotenv").config();
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "employees_db",
});
connection.connect((err) => {
  if (err) throw err;
});
