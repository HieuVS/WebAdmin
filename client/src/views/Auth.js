import React from "react";
import LoginForm from "../Components/auth/LoginForm";
import RegisterForm from "../Components/auth/RegisterForm";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Auth({ authRoute }) {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated } = authState; 
  let body;

  // body = (
  //   <div className='d-flex justify-content-center mt-2'>
  //     <Spinner animation='border' variant='info' />
  //   </div>
  // )
  if(isAuthenticated) return <Redirect to="/main" />
  else
  body = (
    <>
      {authRoute === "login" && <LoginForm />}
      {authRoute === "register" && <RegisterForm />}
    </>
  );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <Typography variant="h1" component="h1">Welcome to WebAdmin</Typography>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
