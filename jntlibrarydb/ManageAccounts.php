<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$secret_key = "YourAESKeyHere";
$method = $_SERVER['REQUEST_METHOD'];
define('SECRET_KEY', 'YourAESKeyHere');
define('AES_METHOD', 'AES-256-CBC');

function encryptData($data) {
    $key = hash('sha256', SECRET_KEY);
    $iv = substr(hash('sha256', SECRET_KEY), 0, 16); // Initialization vector for AES
    $encrypted = openssl_encrypt($data, AES_METHOD, $key, 0, $iv);
    return base64_encode($encrypted); // Encode the encrypted data to store in the database
}

function decryptData($encryptedData) {
    $key = hash('sha256', SECRET_KEY);
    $iv = substr(hash('sha256', SECRET_KEY), 0, 16); // Initialization vector for AES
    $decrypted = openssl_decrypt(base64_decode($encryptedData), AES_METHOD, $key, 0, $iv);
    return $decrypted;
}

function verifyPassword($conn, $username, $inputPassword) {
    $stmt = $conn->prepare("SELECT password FROM Account WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($encryptedPassword);
    $stmt->fetch();
    $stmt->close();

    // Decrypt the stored password
    $storedPassword = decryptData($encryptedPassword);

    // Check if the input password matches the stored password
    if ($storedPassword === $inputPassword) {
        return true; // Password is correct
    } else {
        return false; // Password is incorrect
    }
}

// Handle OPTIONS request
if ($method === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    http_response_code(200);
    exit();
}

// Authenticate the user by decoding the JWT
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    echo json_encode(["success" => false, "message" => "Authorization token is missing."]);
    exit();
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Unauthorized access."]);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "jntlibrarydb";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

// Function to get all accounts
function getAccounts($conn) {
    $sql = "SELECT ID AS id, username, role FROM Account"; 
    $result = $conn->query($sql);
    $accounts = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $accounts[] = $row;
        }
        error_log(print_r($accounts, true));
        echo json_encode(["success" => true, "data" => $accounts]);
    } else {
        echo json_encode(["success" => false, "message" => "No accounts found."]);
    }
}

// Function to add a new account
function addAccount($conn, $username, $password, $role) {
    // Encrypt the password
    $encryptedPassword = encryptData($password);

    $stmt = $conn->prepare("INSERT INTO Account (username, password, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $encryptedPassword, $role);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Account added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add account"]);
    }
    $stmt->close();
}

// Function to update an existing account
function updateAccount($conn, $id, $username, $password = null, $role) {
    if ($password) {
        $encryptedPassword = encryptData($password);
        $stmt = $conn->prepare("UPDATE Account SET username = ?, password = ?, role = ? WHERE ID = ?");
        $stmt->bind_param("sssi", $username, $encryptedPassword, $role, $id);
    } else {
        $stmt = $conn->prepare("UPDATE Account SET username = ?, role = ? WHERE ID = ?");
        $stmt->bind_param("ssi", $username, $role, $id);
    }
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Account updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update account"]);
    }
    $stmt->close();
}

// Function to delete an account
function deleteAccount($conn, $id) {
    $sql = "DELETE FROM Account WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Account deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete account"]);
    }
    $stmt->close();
}

// Routing based on HTTP request method
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        getAccounts($conn);
        break;
    case 'POST':
        addAccount($conn, $data['username'], $data['password'], $data['role']);
        break;
    case 'PUT':
        if (isset($data['id'], $data['username'], $data['role'])) {
            $password = $data['password'] ?? null; // Good handling of optional password
            updateAccount($conn, $data['id'], $data['username'], $password, $data['role']);
        } else {
            echo json_encode(["success" => false, "message" => "Missing parameters for update"]);
        }
        break;
    case 'DELETE':
        $id = $data['id'] ?? null; // Change from `ID` to `id` to match JSON payload
        if ($id) {
            deleteAccount($conn, $id);
        } else {
            echo json_encode(["success" => false, "message" => "Account ID is missing"]);
        }
        break;
    default:
        echo json_encode(["success" => false, "message" => "Invalid request method"]);
}


$conn->close();
?>
