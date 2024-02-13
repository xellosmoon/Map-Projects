<?php
// Your database connection parameters
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'iliganmap';
// Create connection
$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from your table
$result = $conn->query("SELECT * FROM hnhspopdata");

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Close the connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
