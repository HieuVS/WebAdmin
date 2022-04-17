import React from "react";
import { useState } from 'react'
import { Link } from "react-router-dom";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const LoginForm = () => {
  const classes = useStyle();
  const [loginForm, setLoginForm] = useState({
      username:'',
      password:''
  });
  const { username, password } = loginForm;
  const onChangeLogin = event => {
    setLoginForm({ ...loginForm, [event.target.name] : event.target.value });
  }

  const login = async (event) => {
    event.preventDefault();

    try {
        //const loginData = await loginUser(loginForm);
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <>
      <form onSubmit={login}>
        <Grid className={classes.gridParent}>
          <Paper className={classes.paperLogin}>
            <TextField
              className={classes.inputLogin}
              fullWidth
              variant="outlined"
              placeholder="Username"
              name="username"
              type="text"
              required={true}
              onChange={onChangeLogin}
              value={username}
            ></TextField>
            <TextField
              className={classes.inputLogin}
              fullWidth
              variant="outlined"
              placeholder="Password"
              name="password"
              type="password"
              required={true}
              onChange={onChangeLogin}
              value={password}
            ></TextField>
            <Button
              className={classes.btnLogin}
              type="submit"
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </Paper>
        </Grid>
      </form>
      <Typography variant="h6" className={classes.note}>
        Don't have account?
      </Typography>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button className={classes.btnRegister} variant="contained">
          Register
        </Button>
      </Link>
    </>
  );
};

const useStyle = makeStyles(() => ({
  gridParent: {
    marginTop: "20px",
  },
  paperLogin: {
    padding: 20,
    //width: "600px",
    //height: "240px",
    margin: "20px auto",
    borderRadius: "10px",
    //backgroundColor: "blue",
  },
  inputLogin: {
    borderRadius: "10px",
    marginTop: "16px",
  },
  btnLogin: {
    marginTop: "16px",
    borderRadius: "10px",
  },
  btnRegister: {
    marginTop: "16px",
    borderRadius: "10px",
    color: "#EF5845",
    backgroundColor: "white",
  },
  note: {
    color: "white",
  },
}));
export default LoginForm;
