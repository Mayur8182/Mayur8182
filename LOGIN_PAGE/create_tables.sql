CREATE DATABASE IF NOT EXISTS login_page;

USE login_page;

CREATE TABLE IF NOT EXISTS Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
   
    username VARCHAR(100) NOT NULL,
    passward VARCHAR(100) NOT NULL
  
);