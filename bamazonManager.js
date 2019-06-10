//Require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

//MYSQL Connection Activity 06
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
  });