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

$token = str_replace('Bearer ', '', $headers['Authorization']);

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

    // Determine action based on request parameter
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    switch ($action) {
        case 'getBooks':
            getBooks($conn);
            break;
        case 'addBook':
            addBook($conn);
            break;
        case 'updateBook':
            updateBook($conn);
            break;
        case 'deleteBook':
            deleteBook($conn);
            break;
        default:
            echo json_encode(["success" => false, "message" => "Invalid action specified."]);
    }

    $conn->close();

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Unauthorized access."]);
    exit();
}

// Functions to manage books
function getBooks($conn) {
    $sql = "SELECT id, bookTitle, author, type, language, currentQuantity, totalQuantity FROM Book";
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
}

function updateBook($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data['id']) || 
        !isset($data['bookTitle']) || 
        !isset($data['author']) || 
        !isset($data['type']) || 
        !isset($data['language']) ||
        !isset($data['currentQuantity']) ||
        !isset($data['totalQuantity'])
    ) {
        echo json_encode(["success" => false, "message" => "Missing data for book update."]);
        return;
    }

    $id = $data['id'];
    $bookTitle = $data['bookTitle'];
    $author = $data['author'];
    $type = $data['type'];
    $language = $data['language'];
    $currentQuantity = $data['currentQuantity'];
    $totalQuantity = $data['totalQuantity'];

    $sql = "UPDATE Book SET bookTitle = ?, author = ?, type = ?, language = ?, currentQuantity = ?, totalQuantity = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssiii", $bookTitle, $author, $type, $language, $currentQuantity, $totalQuantity, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Book updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update book."]);
    }
    $stmt->close();
}

function deleteBook($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if ID is provided
    if (!isset($data['id'])) {
        echo json_encode(["success" => false, "message" => "Book ID is missing."]);
        return;
    }

    $id = $data['id'];

    // Prepare and execute the SQL delete statement
    $sql = "DELETE FROM Book WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Book deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete book."]);
    }

    $stmt->close();
}

function addBook($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if all required fields are provided
    if (!isset($data['bookTitle']) || !isset($data['author']) || !isset($data['type']) || 
        !isset($data['language']) || !isset($data['currentQuantity']) || !isset($data['totalQuantity'])) {
        echo json_encode(["success" => false, "message" => "Missing required fields."]);
        return;
    }

    $bookTitle = $data['bookTitle'];
    $author = $data['author'];
    $type = $data['type'];
    $language = $data['language'];
    $currentQuantity = (int)$data['currentQuantity'];
    $totalQuantity = (int)$data['totalQuantity'];

    // Prepare and execute the SQL insert statement
    $sql = "INSERT INTO Book (bookTitle, author, type, language, currentQuantity, totalQuantity) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssii", $bookTitle, $author, $type, $language, $currentQuantity, $totalQuantity);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Book added successfully.", "id" => $conn->insert_id]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add book."]);
    }

    $stmt->close();
}



// Other CRUD functions (addBook, updateBook, deleteBook) remain the same
// ...
?>
