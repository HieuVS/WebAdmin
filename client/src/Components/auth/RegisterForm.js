import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const RegisterForm = () => {
    const classes = useStyle();

    return (
      <>
        <form>
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
              ></TextField>
              <TextField
                className={classes.inputLogin}
                fullWidth
                variant="outlined"
                placeholder="Password"
                name="password"
                type="password"
                required={true}
              ></TextField>
              <TextField
                className={classes.inputLogin}
                fullWidth
                variant="outlined"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                required={true}
              ></TextField>
              <Button
                className={classes.btnLogin}
                type="submit"
                color="primary"
                variant="contained"
              >
                Register
              </Button>
            </Paper>
          </Grid>
        </form>
        <Typography variant="h6" className={classes.note}>Already have account? </Typography>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button className={classes.btnRegister} variant="contained">Login</Button>
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
      color: '#EF5845',
      backgroundColor:'white'
    },
    note: {
      color: 'white'
    }
  }));
export default RegisterForm;
