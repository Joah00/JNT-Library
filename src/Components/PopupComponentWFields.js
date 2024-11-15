import React, { useState, useEffect } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete  } from "@mui/material";
import ButtonComponent from "./ButtonComponent";

function PopupComponentWFields({
  open,
  handleClose,
  title,
  userDetails,  
  button1Name,
  button2Name,
  button2OnClick,
  fields = []  
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

  const handleRoleChange = (event, newValue) => {
    setUpdatedDetails(prevDetails => ({
      ...prevDetails,
      role: newValue  
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {fields.map(field => (
          field.id === "role" ? (
            <Autocomplete
              key={field.id}
              options={["ADMIN", "USER"]}
              value={updatedDetails.role || ""}
              onChange={handleRoleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Role"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          ) : (
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
          )
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
