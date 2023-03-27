import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";


const Header = (props) => {
  const history = useHistory()

  function handleLogoutClick() {
    localStorage.clear();
    history.push('/');
  }

  if(props.hasHiddenAuthButtons === false){
    if(localStorage.getItem('username') !== '' && localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== null){
      // je login hege
      return(
        <Box>
          <img src="hg" alt={localStorage.getItem('username')}/>
          <p>{localStorage.getItem('username')}</p>
          <Link to="/">
          <Button onClick={handleLogoutClick}
              className="explore-button"
              variant="text"
            >
              Logout
            </Button>
            </Link>
          </Box>
        

      )
    } else {
      // je login nhi hega
      return (
        <Box className="header">
          <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
          </Box>
          <div>
          <Link to="/register">
          <Button
            className="explore-button"
            variant="text"
          >
            Register
          </Button>
          </Link>  
          <Link to="/login">
          <Button
            className="explore-button"
            
            variant="text"
          >
            Login
          </Button>
          </Link>  
          </div>
  
        </Box>
      );
    }
  } else {

    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
      <Link to="/">
        <Button
        
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
        >
          Back to explore
        </Button>
        </Link>

      </Box>
    );

  }
    
};

export default Header;
