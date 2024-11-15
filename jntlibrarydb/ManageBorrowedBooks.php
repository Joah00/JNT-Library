<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // The request is using the OPTIONS method, so respond with appropriate headers and terminate
    header("HTTP/1.1 200 OK");
    exit();
}

include 'db.php'; // Includes database connection

// Handles borrowing a book
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'borrowBook') {
    $username = $data['username'];
    $userResult = $conn->query("SELECT ID FROM account WHERE username = '$username'");
    if ($userResult->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Username not found"]);
        exit();
    }
    $userRow = $userResult->fetch_assoc();
    $userID = $userRow['ID'];

    $data = json_decode(file_get_contents("php://input"), true);
    $userID = $data['userID'];
    $bookID = $data['bookID'];
    $quantity = $data['quantity'];
    $borrowDate = date('Y-m-d H:i:s'); // Current date and time

    // Check available quantity
    $checkQuantity = $conn->query("SELECT currentQuantity FROM Book WHERE ID = $bookID")->fetch_assoc();
    if ($checkQuantity['currentQuantity'] < $quantity) {
        echo json_encode(["success" => false, "message" => "Not enough copies available"]);
        exit();
    }

    // Insert into borrowedhistory
    $sql = "INSERT INTO borrowedhistory (borrowedBy, bookID, quantity, borrowDate) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiis", $userID, $bookID, $quantity, $borrowDate);
    $stmt->execute();

    // Update book quantity
    $newQuantity = $checkQuantity['currentQuantity'] - $quantity;
    $conn->query("UPDATE Book SET currentQuantity = $newQuantity WHERE ID = $bookID");

    echo json_encode(["success" => true, "message" => "Book borrowed successfully"]);
    exit();
}

// Handles returning a book
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'returnBook') {
    $username = $data['username'];
    $userResult = $conn->query("SELECT ID FROM account WHERE username = '$username'");
    if ($userResult->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Username not found"]);
        exit();
    }
    $userRow = $userResult->fetch_assoc();
    $userID = $userRow['ID'];

    $data = json_decode(file_get_contents("php://input"), true);
    $borrowedHistoryID = $data['borrowedHistoryID'];

    // Fetch book details
    $bookDetails = $conn->query("SELECT bookID, quantity FROM borrowedhistory WHERE ID = $borrowedHistoryID")->fetch_assoc();
    $bookID = $bookDetails['bookID'];
    $quantity = $bookDetails['quantity'];

    // Update book quantity
    $currentQuantity = $conn->query("SELECT currentQuantity FROM Book WHERE ID = $bookID")->fetch_assoc()['currentQuantity'];
    $newQuantity = $currentQuantity + $quantity;
    $conn->query("UPDATE Book SET currentQuantity = $newQuantity WHERE ID = $bookID");

    // Delete from borrowedhistory
    $conn->query("DELETE FROM borrowedhistory WHERE ID = $borrowedHistoryID");

    echo json_encode(["success" => true, "message" => "Book returned successfully"]);
    exit();
}

// Fetches all current borrowed books
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'fetchBorrowedBooks') {
    $sql = "SELECT b.ID, b.borrowedBy, u.username AS userName, bk.bookTitle AS bookName, b.borrowDate FROM borrowedhistory b 
            JOIN account u ON b.borrowedBy = u.ID
            JOIN book bk ON b.bookID = bk.ID";
    $result = $conn->query($sql);

    $borrowedBooks = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $borrowedBooks[] = $row;
        }
    }
    echo json_encode($borrowedBooks);
    exit();
}

$conn->close();
?>
