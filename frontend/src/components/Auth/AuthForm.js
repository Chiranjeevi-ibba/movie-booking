import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';


const labelStyle = { mt: 1, mb: 1 };
const AuthForm = ({ onSubmit }) => {
  // const [inputs, setInputs] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  const [isSignup, setIsSignup] = useState(false);

  const [state,setState]=useState({firstName:'',lastName:'',password:'',email:'',contactNumber:'', age:'', gender:'', address:''})

  const [formErrors, setFormErrors] = useState({firstNameError:false,lastNameError:false,passwordError:false,emailError:false,contactNumberError:false, ageError:false, genderError:false, addressError:false,
    firstNameHelperText:'',lastNameHelperText:'',passwordHelperText:'',emailHelperText:'',contactNumberHelperText:'', ageHelperText:'', genderHelperText:'', addressHelperText:'', submitError: ""})

  const {firstName, lastName, password, email, contactNumber,  age,  gender,  address} = state
  const {firstNameError, lastNameError, passwordError, emailError, contactNumberError,  ageError,  genderError,  addressError, 
    firstNameHelperText,lastNameHelperText,passwordHelperText,emailHelperText,contactNumberHelperText, ageHelperText, genderHelperText, addressHelperText, submitError} = formErrors


  const isAdmin = true;

  const handleChange = (event) => {
    // setInputs((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value,
    // }));

    let {name,value}=event.target;

    setState({...state,[name]:value})



  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsChecker = true;
    let returnedErrors = validate(state);

    // console.log(returnedErrors);

    setFormErrors(validate(state));

    for(let i in returnedErrors) {
      if(i.endsWith("Error")) {
        if(returnedErrors[i]) {
          errorsChecker = false;
        }
      }
    }

    if(errorsChecker) {
      let userData = {...state, age:parseInt(age), contactNumber:parseInt(contactNumber), role: "user"}

      console.log(userData);
      // setState({firstName:'',lastName:'',password:'',email:'',contactNumber:'', age:'', gender:'', address:'', firstNameError:false,lastNameError:false,passwordError:false,emailError:false,contactNumberError:false, ageError:false, genderError:false, addressError:false, firstNameHelperText:'',lastNameHelperText:'',passwordHelperText:'',emailHelperText:'',contactNumberHelperText:'', ageHelperText:'', genderHelperText:'', addressHelperText:'', submitError: ""})

    }  

    
    onSubmit({ state, signup: isSignup });
  };


  
  useEffect(() => {
    console.log("UI rendered");
    console.log(formErrors);
  }, [formErrors]);

  const validate = () => {
    const errors = {};
    let nameRegexp = /^[a-zA-Z ]{2,50}$/
    let emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    let passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    let contactNumberRegexp = /^[6-9][0-9]{9}$/

    console.log("valid triggered");


    if (!firstName) {
      errors.firstNameError = true;
      errors.firstNameHelperText = "*this field is required"
    }else if(nameRegexp.test(firstName) === false){
      errors.firstNameError = true;
      errors.firstNameHelperText = "*please enter valid name"
    } else {
      errors.firstNameError = false;
      errors.firstNameHelperText = ""
    }

    if (!lastName) {
      errors.lastNameError = true;
      errors.lastNameHelperText = "*this field is required"
    }else if(nameRegexp.test(lastName) === false){
      errors.lastNameError = true;
      errors.lastNameHelperText = "*please enter valid name"
    } else {
      errors.lastNameError = false;
      errors.lastNameHelperText = ""
    }

    if (!email) {
      errors.emailError = true;
      errors.emailHelperText = "*this field is required"
    }else if(emailRegexp.test(email) === false){
      errors.emailError = true;
      errors.emailHelperText = "*please enter valid email"
    } else {
      errors.emailError = false;
      errors.emailHelperText = ""
    }

    if (!password) {
      errors.passwordError = true;
      errors.passwordHelperText = "*this field is required"
    }else if(passwordRegexp.test(password) === false){
      errors.passwordError = true;
      errors.passwordHelperText = "*please enter valid password"
    } else {
      errors.passwordError = false;
      errors.passwordHelperText = ""
    }

    if (!contactNumber) {
      errors.contactNumberError = true;
      errors.contactNumberHelperText = "*this field is required"
    }else if(contactNumberRegexp.test(contactNumber) === false){
      errors.contactNumberError = true;
      errors.contactNumberHelperText = "*please enter valid contactNumber"
    } else {
      errors.contactNumberError = false;
      errors.contactNumberHelperText = ""
    }

    if (!age) {
      errors.ageError = true;
      errors.ageHelperText = "*this field is required"
    }else if(isNaN(age) === true){
      errors.ageError = true;
      errors.ageHelperText = "*please enter valid age"
    } else {
      errors.ageError = false;
      errors.ageHelperText = ""
    }

    if (!gender) {
      errors.genderError = true;
      errors.genderHelperText = "*this field is required"
    }else if(isNaN(gender) === false){
      errors.genderError = true;
      errors.genderHelperText = "*please enter valid gender"
    } else {
      errors.genderError = false;
      errors.genderHelperText = ""
    }

    if (!address) {
      errors.addressError = true;
      errors.addressHelperText = "*this field is required"
    } else {
      errors.addressError = false;
      errors.addressHelperText = ""
    }

    // console.log(errors);

    // window.location.reload()
    return errors;
  }
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          {isSignup && (
            <>
             <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  // required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={firstName}
                  error = {firstNameError}
                  helperText = {firstNameHelperText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  // required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={lastName}
                  error = {lastNameError}
                  helperText = {lastNameHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={email}
                  error = {emailError}
                  helperText = {emailHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={password}
                  error = {passwordError}
                  helperText = {passwordHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  type='number'
                  name="age"
                  label="Age"
                  id="age"
                  autoComplete="age"
                  onChange={handleChange}
                  value={age}
                  error = {ageError}
                  helperText = {ageHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="address"
                  onChange={handleChange}
                  value={address}
                  error = {addressError}
                  helperText = {addressHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  type='number'
                  name="contactNumber"
                  label="Contact Number"
                  id="contact"
                  autoComplete="contact"
                  onChange={handleChange}
                  value={contactNumber}
                  error = {contactNumberError}
                  helperText = {contactNumberHelperText}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                name="gender"
                label= "Gender"
                id="gender"
                autoComplete="gender"
                onChange={handleChange}
                value={state.gender}
                select
                error = {genderError}
                helperText = {genderHelperText}
                >
                <MenuItem key="male" value="Male">
                    Male
                </MenuItem>
                <MenuItem key="female" value="Female">
                    Female
                </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <p style={{color: "red"}}>{submitError}</p>
            </>
          )}
         {!isSignup && (
            <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error = {emailError}
                  helperText = {emailHelperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error = {passwordError}
                  helperText = {passwordHelperText}
                />
              </Grid>
            </Grid>
             {/* <FormLabel sx={labelStyle}>Email</FormLabel>
              <TextField
                value={email}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"email"}
                name="email"
              />
              <FormLabel sx={labelStyle}>Password</FormLabel>
              <TextField
                value={password}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"password"}
                name="password"
              /> */}
            </>
          )
         }
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
