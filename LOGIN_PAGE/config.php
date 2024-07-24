<?php
$servername = "localhost";
$username = "root";
$password = ""; // Default XAMPP user password is blank
$dbname = "login_page";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
