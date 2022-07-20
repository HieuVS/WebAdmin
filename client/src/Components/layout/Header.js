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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

function Header() {
  const classes = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [notiDialog, setNotiDialog] = useState(false);
  //const auth = store.getState();
  const auth = useSelector(state => state.auth)
  //console.log("isOwner: ", auth.user);

  const onLogout = () => logoutUser();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={classes.header}
      >
        <Grid item lg={1} md={1} sm={1} className={classes.gridHeader}>
          <Avatar
            alt="logo"
            variant="square"
            className={classes.logo}
            src={logo}
          />
        </Grid>
        <Grid item lg={9} md={9} sm={9}/>
        <Grid item lg={1} md={1} sm={1} className={classes.gridHeader}>
          <Typography className={classes.user}>
            Hello {auth.user.username}
          </Typography>
        </Grid>
        <Grid item lg={1} md={1} sm={1} className={classes.gridHeader}>
          <IconButton onClick={() => setNotiDialog(true)}>
            <NotificationsIcon />
          </IconButton>
          <NotificationDialog
            open={notiDialog}
            onClose={() => setNotiDialog(false)}
          />
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
                  <ListItem button component={Link} to="/">
                    <ListItemIcon className={classes.iconMode}>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography className={classes.btnMode} variant="h6">
                        Trang chủ
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  {auth.user.isOwner ? (
                    <Box>
                      <ListItem button component={Link} to="/item">
                        <ListItemIcon className={classes.iconMode}>
                          <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className={classes.btnMode} variant="h6">
                            Quản lý sản phẩm
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem button component={Link} to="/staff">
                        <ListItemIcon className={classes.iconMode}>
                          <SupervisorAccountIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className={classes.btnMode} variant="h6">
                            Quản lý nhân viên
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem button component={Link} to="/table">
                        <ListItemIcon className={classes.iconMode}>
                          <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className={classes.btnMode} variant="h6">
                            Quản lý đặt bàn
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem button component={Link} to="/discount">
                        <ListItemIcon className={classes.iconMode}>
                          <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className={classes.btnMode} variant="h6">
                            Quản lý khuyến mại
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem button component={Link} to="">
                        <ListItemIcon className={classes.iconMode}>
                          <TrendingUpIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className={classes.btnMode} variant="h6">
                            Thống kê
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Box>
                  ) : (
                    <Box>
                      <ListItem button component={Link} to="/Schedule">
                        <ListItemIcon className={classes.iconMode}>
                          <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className={classes.btnMode} variant="h6">
                            Đặt bàn
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Box>
                  )}
                  <ListItem button onClick={onLogout}>
                    <ListItemText className={classes.btnLogout}>
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
    backgroundColor: '#20B2AA',
  },
  logo: {
    width: "80%",
    height: "100%",
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
    marginRight: "10px",
  },
  iconMode: {
    minWidth: '38px',
    alignItems: 'center'
  },
  btnMode: {
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  },
  btnLogout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
