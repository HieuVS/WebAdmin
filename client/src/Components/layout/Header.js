import { Avatar, IconButton, Typography, SvgIcon, ThemeProvider, Grid, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, } from "@material-ui/core";
import AirplayIcon from "@material-ui/icons/Airplay";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles, createTheme } from "@material-ui/core/styles";
import logo from "../../assets/image/logo.png";
import { useState } from "react";
import { logoutUser } from "../../api/authApi";
import store from "../../redux/store";
import { useSelector } from 'react-redux'
import NotificationDialog from "./NotificationDialog";

function Header() {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [notiDialog, setNotiDialog] = useState(false);
  //const auth = store.getState();
  const auth = useSelector(state => state.auth)
  //console.log("isOwner: ", !auth.user.isOwner);

  const onLogout = () => logoutUser();
  // const list = (
  //   <List>
  //     {["Owner Mode", "Logout"].map((item, index) => (
  //       <ListItem button key={index}>
  //         <ListItemIcon></ListItemIcon>
  //         <ListItemText>
  //           <Typography variant="h6">{item}</Typography>
  //         </ListItemText>
  //       </ListItem>
  //     ))}
  //   </List>
  // );
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={classes.header}
      >
        <Grid item lg={10} className={classes.gridHeader}>
          <Avatar
            alt="logo"
            variant="square"
            className={classes.logo}
            src={logo}
          />
        </Grid>
        <Grid item lg={1} className={classes.gridHeader}>
          <Typography className={classes.user}>Hello {auth.user.username}</Typography>
        </Grid>
        <Grid item lg={1} className={classes.gridHeader}>
          <IconButton onClick={()=>setNotiDialog(true)}>
            <NotificationsIcon />
          </IconButton>
          <NotificationDialog open={notiDialog} onClose={()=>setNotiDialog(false)}/>
          <IconButton onClick={() => setIsOpen(true)}>
            <SvgIcon
              className={classes.iconRate}
              focusable={false}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </SvgIcon>
          </IconButton>
          <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
            <Box className={classes.drawer}>
              <Box className={classes.headerMenu}>
                <AirplayIcon
                  className={classes.iconMenu}
                  color="primary"
                ></AirplayIcon>
                <Typography className={classes.textMenu} variant="h5">
                  Menu
                </Typography>
              </Box>
              <Box>
                <List>
                  {auth.user.isOwner ? (
                    <ListItem button>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText>
                        <Typography variant="h6">Owner Mode</Typography>
                      </ListItemText>
                    </ListItem>
                  ) : null}
                  <ListItem button onClick={onLogout}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText>
                      <Typography variant="h6">Logout</Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Drawer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
const useStyle = makeStyles(() => ({
  header: {
    width: "100%",
    height: "8vh",
    display: "flex",
    backgroundColor: "green",
  },
  logo: {
    width: "6%",
    heigh: "100%",
  },
  gridHeader: {
    height: "100%",
    alignItems: "center",
    display: "flex",
  },
  user: {
    alignItems: "center",
  },
  drawer: {
    width: "250px",
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  headerMenu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4B4D53",
    padding: 0,
    marginTop: "10px",
    minHeight: "28px",
  },
  iconMenu: {
    paddingRight: "10px",
  },
}));

const theme = createTheme({
  overrides: {
    MuiAvatar: {
      root: {
        height: "100%",
      },
    },
  },
});

export default Header;
