<?php
include('config.php'); // Include database connection

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$car_details = $_POST['car-details'];
$date_time = $_POST['date-time'];

// Insert data into the Customers table
$sql = "INSERT INTO Customers (name, email, phone, car_details, date_time) VALUES ('$name', '$email', '$phone', '$car_details', '$date_time')";

if ($conn->query($sql) === TRUE) {
    echo "<h2>Thank You!</h2>";
    echo "<p>Your booking has been submitted successfully.</p>";
    echo "<p>We will contact you shortly.</p>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
