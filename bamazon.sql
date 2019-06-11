DROP DATABASE IF EXISTS bamazonDB

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
item_id INT(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(11) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Electronics", 1200.00, 10),
("Notebook", "Electronics", 299.99, 8),
("iPhone", "Electronics", 800.00, 25),
("Sofa", "Furniture", 450.00, 15),
("Table", "Furniture", 500.00, 20),
("Shelf", "Furniture", 100.00, 15),
("Eggs", "Groceries", 5.00, 200),
("Milk", "Groceries", 3.00, 30),
("Coffee", "Groceries", 15.00, 20),
("Beer", "Groceries", 10.00, 10);

SELECT * FROM products;

