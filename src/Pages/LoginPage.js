import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Send login data to the PHP API
    fetch("http://localhost/jntlibrarydb/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Store user role in local storage
          localStorage.setItem("userRole", data.role);
          alert(data.message);
  
          // Navigate based on the user's role
          if (data.role === "ADMIN") {
            navigate("/manageBooks");
          } else {
            navigate("/viewBooks");
          }
        } else {
          // Show error message if login fails
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const handleForgotPassword = () => {
    alert("Forgot Password functionality goes here.");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        component="div"
        sx={{
          width: '100%',
          padding: '50px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom style={{ color: '#000' }}>
          JNT Library Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#333',
              color: '#fff',
              marginTop: '1rem',
              padding: '10px',
            }}
          >
            Login
          </Button>
          <Box textAlign="center" marginTop="1rem">
            <Link
              href="#"
              onClick={handleForgotPassword}
              underline="hover"
              style={{ color: '#555', fontSize: '0.9rem' }}
            >
              Forgot Password?
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
