import { Button, CircularProgress, formControlClasses, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar, SnackbarProvider } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";
import ipConfig from "../ipConfig.json";



const Register = () => {
  const history = useHistory();
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[showloader, setShowloader] = useState(false)
  const[message,setMessage]=useState('');

  const { enqueueSnackbar } = useSnackbar();
  


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
    const register = async (formData) => {
    const apiUrl = `https://qkart-frontend-5kte.onrender.com/api/v1/auth/register`
    const postData={
      username: username,
      password: password,
    }
    // start loading sign
    setShowloader(true)
    axios.post(apiUrl, postData)
  .then(async response => {
    history.push('/login');
    
    enqueueSnackbar("user successfully created" , {
      variant: "success"
    })
    
    // remove loading sign
    setShowloader(false)
    // Handle success response
    console.log("response: ", response);
  })

  .catch(error => {
    // Handle error response
    enqueueSnackbar(error.response.data.message, {
      variant: "error"
    })

  })
}
  

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {

    if(username === "" || password === ""){
      
      enqueueSnackbar("Username or Password is required" , {
        variant: "error"
      })
    }

    if (username.length < 6 || password.length < 6){
      enqueueSnackbar("required length of pass or username should be greater than 6" , {
      variant: "error"
      })
    }

    else if (password !== confirmPassword){ 
      enqueueSnackbar("password and confirmpassword do not match" , {
        variant: "error"
        })
    }
    
    else if(username !== "" && password !== ""){
      
      register()
      
    } 
     
  };


  const changeUsernameHundler = (event) =>{
    setUsername(event.target.value)
  }

  const changePasswordHundler = (event) =>{
    setPassword(event.target.value)
  }


  const changeConfirmPasswordHundler = (event) =>{
    setConfirmPassword(event.target.value)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            onChange={changeUsernameHundler}
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <SnackbarProvider />
          <TextField
          onChange={changePasswordHundler}
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
          onChange={changeConfirmPasswordHundler}
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />
           { showloader === true ? <CircularProgress /> : null}
           <Link to="/login">
           <Button onClick={validateInput} className="button" variant="contained">
            Register Now
           </Button>
           </Link>
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
