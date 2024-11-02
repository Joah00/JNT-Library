import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function PopupComponent({ open, handleClose, title, children }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {title}
        <IconButton 
          aria-label="close"
          onClick={handleClose}
          sx={{ 
            position: 'absolute', 
            right: 10, 
            top: 8, 
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="popup-content">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PopupComponent;
