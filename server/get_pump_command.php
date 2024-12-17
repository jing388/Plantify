<?php
// Database connection
$conn = new mysqli("https://auth-db1630.hstgr.io/", "u779691448_JING009", "Tamendegushi1!", "u779691448_sensor_data");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to get the command value
$sql = "SELECT command FROM pump_control ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output the command value
    while ($row = $result->fetch_assoc()) {
        echo $row["command"];
    }
} else {
    echo "0";  // Default to off if no command is found
}

$conn->close();
?>