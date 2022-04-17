import React from "react";
import LoginForm from "../Components/auth/LoginForm";
import RegisterForm from "../Components/auth/RegisterForm";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Auth({ authRoute }) {
  let body;

  // body = (
  //   <div className='d-flex justify-content-center mt-2'>
  //     <Spinner animation='border' variant='info' />
  //   </div>
  // )
  //else if(isAuthenticated) return <Redirect to='/dashboard' />
  //else
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
