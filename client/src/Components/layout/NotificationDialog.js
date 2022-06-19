import {
  Button,
  Dialog,
  DialogTitle,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function NotificationDialog(props) {
  const { onClose, open } = props;
  const classes = useStyle();

  return (
    <Dialog onClose={onClose} open={open} className={classes.notiDialog}
    style={{inset: '0px 0px 75% 71%'}}
    >
      <DialogTitle>Thông báo</DialogTitle>
      <Typography>Bạn có muốn sản phẩm không?</Typography>
      
    </Dialog>
  );
}

const useStyle = makeStyles(() => ({
  
}));
export default NotificationDialog;
