import React from 'react';
import { TextField, Box } from '@mui/material';

function SearchBar({ onChange, placeholder }) {
  return (
    <Box sx={{ 
      marginBottom: 1,
      width: '128%', 
      paddingRight: '10%', 
      paddingLeft: '2%' 
    }}>
      <TextField
        fullWidth 
        label={placeholder}
        variant="outlined"
        onChange={onChange}
      />
    </Box>
  );
}

export default SearchBar;