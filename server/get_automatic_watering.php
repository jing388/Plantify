<?php
$servername = "https://auth-db1630.hstgr.io/";
$username = "u779691448_JING009"; // Default username
$password = "Tamendegushi1!"; // Default password for localhost
$dbname = "u779691448_sensor_data";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to check the automatic watering status
$sql = "SELECT automatic FROM automatic_watering WHERE id = 1";
$result = $conn->query($sql);

// Check if the query returns a result
if ($result->num_rows > 0) {
    // Fetch the row
    $row = $result->fetch_assoc();

    // Return the automatic watering status
    echo $row['automatic']; // Will return 1 or 0
} else {
    echo "0"; // If no result is found, return 0
}

// Close the database connection
$conn->close();
?>