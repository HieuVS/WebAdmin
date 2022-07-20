import { Button, Dialog, DialogTitle, Box, Typography,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deleteOrder } from '../../api/orderApi';
import { useState } from 'react';
import WarningMessage from "./WarningMessage";

function ConfirmDialog(props) {
  const { onClose, open, orderId } = props;
  const classes = useStyle();
  const [alert, setAlert] = useState(null);

  const onDeleteOrder = async (orderId) => {
    try {
      const response = await deleteOrder(orderId);
      console.log(response)
      if (!response.success) {
        setAlert({ type: "danger", message: response.message });
        setTimeout(() => setAlert(null), 5000);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{className: classes.confirmPaper}}>
      <DialogTitle className={classes.titleConfirm}>CONFIRMATION</DialogTitle>
      <WarningMessage info={alert}/>
      <Box className={classes.contentDelete}>
        <Typography className={classes.confirmMessage}>Bạn có chắc muốn xoá sản phẩm không?</Typography>
      </Box>  
      <Box className={classes.btnConfirm}>
        <Button onClick={()=>onDeleteOrder(orderId)}>Có</Button>
        <Button onClick={onClose}>Không</Button>
      </Box>
    </Dialog>
  );
}

const useStyle = makeStyles(() => ({
  confirmPaper: {
    minWidth: '25%',
    maxHeight: '700px',
    justifyContent: 'center'
  },
  titleConfirm: {
    display: 'flex',
    justifyContent: 'center'
  },
  confirmMessage: {
    display: 'flex',
    justifyContent: 'center'
  },
  btnConfirm: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 0'
  },
  contentDelete: {
    padding: '10px'
  }
}));

export default ConfirmDialog;
