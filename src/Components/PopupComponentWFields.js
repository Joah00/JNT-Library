import React, { useState, useEffect } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ButtonComponent from "./ButtonComponent";

function PopupComponentWFields({
  open,
  handleClose,
  title,
  userDetails,  // Use the appropriate prop name based on the data
  button1Name,
  button2Name,
  button2OnClick,
  fields = []  // Default to an empty array if not provided
}) {
  const [updatedDetails, setUpdatedDetails] = useState(userDetails || {});

  useEffect(() => {
    setUpdatedDetails(userDetails || {});
  }, [userDetails]);

  const handleInputChange = (e, fieldId) => {
    const { value } = e.target;
    setUpdatedDetails(prevDetails => ({
      ...prevDetails,
      [fieldId]: value
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map(field => (
          <TextField
            key={field.id}
            margin="dense"
            id={field.id}
            label={field.label}
            type="text"
            fullWidth
            variant="outlined"
            value={updatedDetails[field.id] || ''}
            onChange={(e) => handleInputChange(e, field.id)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <ButtonComponent
          buttonName={button1Name}
          onClick={handleClose}
          buttonWidth="150px"
          marginRight="0"
        />
        <ButtonComponent
          buttonName={button2Name}
          onClick={() => {
            button2OnClick(updatedDetails);
            handleClose();
          }}
          buttonWidth="150px"
          marginRight="120px"
        />
      </DialogActions>
    </Dialog>
  );
}

export default PopupComponentWFields;
