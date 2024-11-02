import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function SnackbarComponent({ open, handleClose, message, autoHideDuration=3000 }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarComponent;
