import React from 'react';
import { createTheme, ThemeProvider, Button } from '@mui/material';



function ButtonComponent({buttonName, buttonWidth='auto', buttonHeight='auto', marginRight='auto', onClick}) {
  const theme = createTheme({
    palette: {
      blackWhite: {
        main: '#000',  
        contrastText: '#fff',
        dark: '#fff', 
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#fff',  
            backgroundColor: '#000',  
            '&:hover': {
              color: '#000', 
              backgroundColor: '#fff', 
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Button 
        color="blackWhite" 
        variant="contained" 
        sx={{ width: buttonWidth, height: buttonHeight, mr: marginRight}} 
        onClick={onClick}
        >
        {buttonName}
      </Button>
    </ThemeProvider>
  );
}

export default ButtonComponent;
