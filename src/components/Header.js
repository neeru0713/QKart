import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import React, {useState} from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import ipConfig from "../ipConfig.json"


const Header = (props) => {
  const history = useHistory()
  const [timerId, setTimerId] = useState()
  
  const performSearch = async (searchText) => {
    props.onChildEvent(searchText)
  }

  const debounceSearch = async (event, debounceTimeout) => {
    const searchText = event.target.value;
  
    // Clear the existing timer if it exists
    if (timerId) {
      clearTimeout(timerId);
    }
    
    // Set a new timer to call the API after 500ms
    let val = setTimeout(() => {
      performSearch(searchText);
    }, 500);

    setTimerId(val)
  }

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
          <input placeholder="searchBar"></input>
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
              <img src="logo_light.svg" alt="QKart-icon"/>
          </Box>

          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            placeholder="Search for items/categories"
            onChange={debounceSearch}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  <SearchIcon  />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />

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
