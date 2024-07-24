<?php
include('config.php');

$username = $_POST['username'];
$password = $_POST['password'];


$sql = "SELECT * FROM Customers WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Welcome, $username!</h2>";
    echo "<p>You have successfully logged in.</p>";
} else {
    echo "<h2>Login Failed</h2>";
    echo "<p>Invalid username or password.</p>";
}


$conn->close();
?>
