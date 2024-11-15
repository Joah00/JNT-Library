<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$secret_key = "YourAESKeyHere"; // Use the same secret key as in login.php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check for Authorization header
$headers = apache_request_headers();
if (!isset($headers['Authorization'])) {
    echo json_encode(["success" => false, "message" => "Authorization token is missing."]);
    exit();
}

$token = str_replace('Bearer ', '', $headers['Authorization'] ?? '');

try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
    $userId = $decoded->user_id;

    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "jntlibrarydb";
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        echo json_encode(["success" => false, "message" => "Database connection failed."]);
        exit();
    }

    // Query to retrieve all books
    $sql = "SELECT id, bookTitle, author, type, language, currentQuantity AS availableQuantity FROM Book";
    $result = $conn->query($sql);

    $books = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
        echo json_encode(["success" => true, "data" => $books]);
    } else {
        echo json_encode(["success" => false, "message" => "No books found."]);
    }

    $conn->close();

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Unauthorized access."]);
    exit();
}
?>
