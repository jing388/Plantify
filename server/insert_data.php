<?php
$servername = "https://auth-db1630.hstgr.io/";
$username = "u779691448_JING009"; // Default username
$password = "Tamendegushi1!"; // Default password for localhost
$dbname = "u779691448_sensor_data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the request
$soil_moisture = $_GET['soil_moisture'];
$temperature = $_GET['temperature'];
$humidity = $_GET['humidity'];

// Insert data into the table
$sql = "INSERT INTO readings (soil_moisture, temperature, humidity) VALUES ('$soil_moisture', '$temperature', '$humidity')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>