<?php
$servername = "localhost";
$username = "root";
$password = "";  // Default XAMPP user password blank hoti hai
$dbname = "booking_system";  // Import kiye gaye database ka naam

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
