import "./App.css";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/layout/Landing";
import Auth from "./views/Auth";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import store from "./redux/store";
import { actionAuths } from "./redux/actions/actionAuths";
import ProtectedRoute from "./Components/routing/ProtectedRoute";
import Main from "./views/Main";
import { loadUser } from "./api/authApi";

function App() {
  useEffect(()=> {
    loadUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <ProtectedRoute exact path="/main" component={Main}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        color: "#3E4045",
        padding: "6px 16px",
        fontSize: "14px",
        minWidth: "64px",
        boxSizing: "border-box",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        fontFamily: "Inter,Roboto,Arial,sans-serif",
        fontWeight: 700,
        lineHeight: "normal",
        borderRadius: "4px",
        letterSpacing: "0.4px",
        textTransform: "uppercase",
      },
      contained: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "16px",
        boxShadow: "none",
        minHeight: "40px",
        fontWeight: 600,
        paddingTop: "6px",
        paddingLeft: "36px",
        borderRadius: "20px",
        paddingRight: "36px",
        paddingBottom: "6px",
        backgroundColor: "#B3B5BA",
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "10px",
      },
    },
    MuiInputBase: {
      root: {
        fontSize:'20px',
      }
    },
    MuiFormControlLabel: {
      label: {
        fontSize: '20px'
      }
    }
  },
  typography: {
    h1: {
      fontFamily: "Inter,Roboto,Arial,sans-serif",
    },
    h3: {
      fontSize: "36px",
      fontFamily: "Inter,Roboto,Arial,sans-serif",
      fontWeight: 600,
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    body1: {
      color: "#4B4D53",
      fontSize: "16px",
      fontFamily: "Inter,Roboto,Arial,sans-serif",
      fontWeight: 500,
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    h6: {
      color: "#4B4D53",
      fontSize: "20px",
      fontFamily: "Inter,Roboto,Arial,sans-serif",
      fontWeight: 500,
      lineHeight: "normal",
      letterSpacing: "normal",
    },
    body2: {
      color: "#4B4D53",
      fontSize: "14px",
      fontFamily: "Inter,Roboto,Arial,sans-serif",
      fontWeight: 400,
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  palette: {
    primary: {
      main: "#EF5845",
    },
  },
  button: {
    root: {
        color: '#3E4045',
        padding: '6px 16px',
        fontSize: '14px',
        minWidth: '64px',
        boxSizing: 'border-box',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        fontFamily: 'Inter,Roboto,Arial,sans-serif',
        fontWeight: 700,
        lineHeight: 'normal',
        borderRadius: '4px',
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
    }
  },
  props: {
    MuiIconButton : {
        root : {
            flex: '0 0 auto',
            color: '#4B4D53',
            padding: '8px',
            overflow: 'visible',
            fontSize: '1.5rem',
            textAlign: 'center',
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            borderRadius: '50%',
        }
    }
  },
});
export default App;
