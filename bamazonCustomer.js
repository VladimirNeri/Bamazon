//Require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var numeral = require("numeral");

//MYSQL Connection Activity 06
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    getTable();
  });

function getTable() {
  
  // select all in the products table
  var query = "SELECT * FROM products";
  
  connection.query(query, function(error, results) {
    
    //set up the cli-table2 columns and headings
    var table = new Table({
      head: ["Item", "Product", "Department", "In Stock", "Price"], 
      colWidths: [10, 30, 20, 10, 15]
    });
    
    //populate the cli-table2 and use numeral.js to format into currency values
    for (var i = 0; i < results.length; i++) {
      table.push(
        [results[i].item_id, results[i].product_name, results[i].department_name, results[i].stock_quantity, numeral(results[i].price).format("$0,0.00")]
      );
    }
    
    console.log("\nHere is a display of all items available for sale.")
    console.log(table.toString());
    console.log("\n");
    return results;
  });
}


