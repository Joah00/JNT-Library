<?php
require 'vendor/autoload.php'; // Include the autoload file for firebase/php-jwt
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection setup
$servername = "localhost";
$username = "root";
$password = "";
$database = "jntlibrarydb";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

// Retrieve login data
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Secret key for JWT
$secret_key = "YourAESKeyHere"; // Replace with a strong, secure key

// Validate user credentials
$sql = "SELECT ID, username, password, role FROM Account WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found."]);
    exit();
}

$user = $result->fetch_assoc();
if (!isset($user['ID'])) {
    error_log("User ID is missing in the database response for user: " . $email);
    echo json_encode(["success" => false, "message" => "Invalid credentials."]);
    exit();
}

$encrypted_password = $user['password'];
$hexadecimal = bin2hex($encrypted_password);
$decrypted_password_query = "SELECT CAST(AES_DECRYPT(UNHEX(?), 'YourAESKeyHere') AS CHAR) AS decrypted_password";
$dec_stmt = $conn->prepare($decrypted_password_query);
$dec_stmt->bind_param("s", $hexadecimal);
$dec_stmt->execute();
$dec_result = $dec_stmt->get_result();
$decrypted_password = $dec_result->fetch_assoc()['decrypted_password'];

if ($password !== $decrypted_password) {
    echo json_encode(["success" => false, "message" => "Incorrect username or password."]);
    exit();
}

$payload = [
    "user_id" => $user['ID'],
    "role" => $user['role'],
    "exp" => time() + (5 * 60 * 60)
];
$jwt = JWT::encode($payload, $secret_key, 'HS256');

echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "token" => $jwt,
    "role" => $user['role'] 
]);
    


$conn->close();
?>