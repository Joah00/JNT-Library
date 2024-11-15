<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS preflight request
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

// Invalidate the token on client side (this response informs the client to clear the token)
echo json_encode(["success" => true, "message" => "Logged out successfully. Please clear the token on client side."]);
exit();
