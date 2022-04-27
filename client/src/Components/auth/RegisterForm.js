import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Paper, Typography, TextField, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WarningMessage from "../layout/WarningMessage";
import { registerUser } from "../../api/authApi";

const RegisterForm = () => {
  const classes = useStyle();
  const [registerForm, setRegisterForm] = useState({
    username:'',
    password:'',
    confirmPassword:'',
    role: 'Staff'
  });

  const [alert, setAlert] = useState(null);
  const { username, password, confirmPassword, role } = registerForm;

  const onChangeRegister = (event) => {
    setRegisterForm({...registerForm, [event.target.name]: event.target.value});
    //console.log("role:", registerForm)
  }

  const register = async (event) => {
    event.preventDefault();
    console.log(registerForm)
    if(password !== confirmPassword) {
      setAlert({ type: 'warning', message: 'ConfirmPassword does not match' })
			setTimeout(() => setAlert(null), 5000)
			return
    }
    try {
      const registerResponse = await registerUser(registerForm);
      if(!registerResponse.success) {
        setAlert({type: 'error', message: registerResponse.message});
        setTimeout(() => setAlert(null), 5000)
			  return
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={register}>
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
              value={username}
              onChange={onChangeRegister}
            ></TextField>
            <TextField
              className={classes.inputLogin}
              fullWidth
              variant="outlined"
              placeholder="Password"
              name="password"
              type="password"
              required={true}
              value={password}
              onChange={onChangeRegister}
            ></TextField>
            <TextField
              className={classes.inputLogin}
              fullWidth
              variant="outlined"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              required={true}
              value={confirmPassword}
              onChange={onChangeRegister}
            ></TextField>
            <WarningMessage info={alert}/>
            <RadioGroup value={role} className={classes.radioRole} required={true}>
              <FormControlLabel className={classes.radio} value="Owner" name="role" label="Owner" onChange={onChangeRegister} control={<Radio color="primary" />}/>
              <FormControlLabel className={classes.radio} value="Staff" name="role" label="Staff" onChange={onChangeRegister} control={<Radio color="primary"/>}/>
            </RadioGroup>
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
      <Typography variant="h6" className={classes.note}>
        Already have account?
      </Typography>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button className={classes.btnRegister} variant="contained">
          Login
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
  radioRole: {
    display: 'flex',
    marginLeft: '6px',
    marginTop: '8px',
    flexDirection:'row'
  },
  radio: {
    width: '50%',
    marginRight: 0,
  },
}));
export default RegisterForm;
