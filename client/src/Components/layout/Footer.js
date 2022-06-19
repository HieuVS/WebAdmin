import { Typography, Box } from "@material-ui/core";
import { makeStyles, createTheme } from "@material-ui/core/styles";

function Footer() {
    const classes = useStyle();
  return (
    <Box className={classes.footer}>
        <Typography>Copyright © Vu Sy Hieu All Rights Reserved</Typography>
    </Box>
  )
}

const useStyle = makeStyles(() => ({
    footer: {
        width: '100%',
        display: 'flex',
        background: 'inherit',
        minHeight: '40px',
        alignItems: 'center',
        justifyContent: 'center',
    },

  }));
export default Footer