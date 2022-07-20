import { Button, Dialog, DialogTitle, Box, Typography,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deleteItem } from "../../../api/itemApi";
import { useState } from 'react';
import WarningMessage from "../WarningMessage";

function DeleteItemDialog(props) {
  const { onClose, open, itemId } = props;
  const classes = useStyle();
  const [alert, setAlert] = useState(null);
  
  const onDeleteItem = async (itemId) => {
    console.log("itemId:", itemId)
    try {
      const response = await deleteItem(itemId);
      console.log(response)
      if (!response.success) {
        setAlert({ type: "danger", message: response.message });
        setTimeout(() => setAlert(null), 5000);
      }
      else onClose();
      console.log("End")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog onClose={onClose} open={open} PaperProps={{className: classes.confirmPaper}}>
      <DialogTitle className={classes.titleConfirm}>CONFIRMATION</DialogTitle>
      <WarningMessage info={alert}/>
      <Box className={classes.contentDelete}>
        <Typography className={classes.confirmMessage}>Bạn có chắc muốn xoá sản phẩm này không?</Typography>
      </Box>  
      <Box className={classes.btnConfirm}>
        <Button onClick={()=>onDeleteItem(itemId)}>Có</Button>
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

export default DeleteItemDialog;
