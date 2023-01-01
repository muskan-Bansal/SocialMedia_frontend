import React, { useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import { gapi } from "gapi-script";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { AUTH } from '../../constants/actionTypes'; 
import { signin, signup } from '../../actions/auth';
import Icon from './icon';
import useStyles from './styles';

import Input from './Input';
 
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => { 
  
    const dispatch = useDispatch();
      const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();

  var clientId="922675428282-7iob0dkacvjbm5feb54bq2fu26e0dv4j.apps.googleusercontent.com"
  useEffect(()=>{
  gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:{clientId},
    // plugin_name: "chat",
  //  gapi.auth.getToken().access_Token
});
    })
  },[])


  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const switchMode=()=>{
    setIsSignup(!isSignup)

  }

  const googleSuccess=async(res)=>{
    console.log(res)
    
    const result = res?.profileObj;
    const token = res?.tokenId;
  // console.log(result,token)
    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure= (error)=>{
    console.log(error)
    console.log("google sign in was unsuccessful .Try again later...")
  }

  return ( 
  
  <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}> 
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon /> 
        </Avatar>
          <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
      
       <form className={classes.form} onSubmit={handleSubmit}>
         <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> } 
          </Grid> 
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button> 
              <GoogleLogin
            clientId="922675428282-7iob0dkacvjbm5feb54bq2fu26e0dv4j.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
           <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>

    </form> 
      </Paper>
    </Container>
  )
}

export default Auth