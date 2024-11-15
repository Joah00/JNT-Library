<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$secret_key = "your_secret_key"; // Use environment variables for better security

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

$token = str_replace('Bearer ', '', $headers['Authorization']);

try {
    // Decode the JWT token
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
    $userId = $decoded->user_id;

    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "jntlibrarydb";
    $conn = new mysqli($servername, $username, $password, $database);

    // Check for database connection error
    if ($conn->connect_error) {
        echo json_encode(["success" => false, "message" => "Database connection failed."]);
        exit();
    }

    // SQL query to retrieve borrowed books with status "BORROW"
    $sql = "SELECT bh.ID as id, bh.borrowDate as borrowedDate, DATE_ADD(bh.borrowDate, INTERVAL 14 DAY) as dueDate, b.bookTitle as bookName
            FROM BorrowedHistory bh
            INNER JOIN Book b ON bh.bookID = b.ID
            WHERE bh.borrowedBy = ? AND bh.statusBorrowedBookID = 2";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $borrowedBooks = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $borrowedBooks[] = $row;
        }
        echo json_encode(["success" => true, "data" => $borrowedBooks]);
    } else {
        echo json_encode(["success" => false, "message" => "No borrowed books found."]);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    // Handle any decoding errors
    echo json_encode(["success" => false, "message" => "Unauthorized access."]);
    exit();
}
?>
