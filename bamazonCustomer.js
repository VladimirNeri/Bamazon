//Require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var numeral = require("numeral");
var chalk = require("chalk");

//MYSQL Connection Activity 06
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  //console.log("connected as id" + connection.threadId);
  displayProducts();
});

function displayProducts() {
  //NPM CLI-Table 
  var query = "SELECT * FROM products";
  connection.query(query, function (error, results) {
    var table = new Table({
      head: ["Item", "Product", "Department", "Price"],
      colWidths: [10, 30, 20, 10]
    });

    //Push Items to Table Array
    for (var i = 0; i < results.length; i++) {
      table.push(
        [results[i].item_id, results[i].product_name, results[i].department_name, numeral(results[i].price).format("$0,0.00")]
      );
    }

    console.log("\nHere is a display of all items available for sale.")
    console.log(table.toString());
    console.log("\n");
    return results;
  });
  start();
}

function start() {
  // Activity 10 
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    //console.log(results);
    inquirer.prompt([
      {
        name: "itemId",
        type: "input",
        message: "What item would you like to purchase? "
      }, {
        name: "purchase",
        type: "input",
        message: "How many units would you like to buy?: "
      }])
      .then(function (answer) {
        // get the information of the chosen item.  Activity 10.  
        connection.query("SELECT * FROM products", function (err, results) {
          if (err) throw err;
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === answer.itemId) {
              chosenItem = results[i];
              console.log(chosenItem);
            }
          }

          if (chosenItem.stock_quantity >= parseInt(answer.purchase)) {

            var newQuantity = chosenItem.stock_quantity - answer.purchase;
            // console.log(newQuantity);
            connection.query('UPDATE products SET ? WHERE ?',
              [
                {
                  stock_quantity: newQuantity
                },

                {
                  item_id: chosenItem.item_id

                }
              ],

              function (error) {
                if (error) throw err;
                console.log("Order successful!");
                console.log("Total cost: " + (answer.purchase * chosenItem.price));
                start();
              }
            )
          } else if (chosenItem.stock_quantity <= 0) {

            connection.query("DELETE FROM products WHERE ?", {
              item_id: chosenItem.item_id
            }, function (err, res) {

              console.log("Sorry, item is SOLD OUT!");
              start();
            });

          } else {
            console.log("Insufficient quantity. Try again...");
            start();
          };
        })
        // closing bracket of .then
      });
  });
}

