CREATE DATABASE IF NOT EXISTS CarWashing;

USE CarWashing;

CREATE TABLE IF NOT EXISTS Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    car_details TEXT NOT NULL,
    date_time DATETIME NOT NULL
    Username VARCHAR(100) NOT NULL
    Passward VARCHAR(15) NOT NULL

);
