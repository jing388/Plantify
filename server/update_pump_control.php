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

// Retrieve the ID from the query parameters
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Update the timestamp for the given ID
    $sql = "UPDATE pump_control SET timestamp = NOW() WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo "Timestamp updated successfully for ID: $id";
        } else {
            echo "Error updating timestamp: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Error preparing SQL statement: " . $conn->error;
    }
} else {
    echo "Invalid or missing ID parameter.";
}

// Close the connection
$conn->close();
?>