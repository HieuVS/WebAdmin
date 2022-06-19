import { Button, Dialog, DialogTitle, TextField, Paper, Box, RadioGroup, FormControlLabel, Radio, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import { useState } from "react";
import PickItemDialog from "./PickItemDialog";

function AddOrderDialog(props) {
  const { open, onClose } = props;
  const classes = useStyle();

  const [openPickItem, setOpenPickItem] = useState(false);
  return (
    <Dialog
      open={open}
      maxWidth={false}
      className={classes.dialogAddItem}
      PaperProps={{className: classes.orderPaper}}
    >
      <Box>
        <IconButton className={classes.btnClose} onClick={onClose}>
          <CancelIcon className={classes.iconClose}/>
        </IconButton>        
        <DialogTitle >Thêm đơn hàng mang đi</DialogTitle>
        <Box className={classes.boxAddItem}>
          <form>
            <Box >
              <Box className={classes.inputAddInfo}>
                <TextField label="Họ và tên" className={classes.inputLeft} required></TextField>
                <TextField label="Số điện thoại" className={classes.inputRight} required></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <TextField label="Địa chỉ" fullWidth required></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <Button onClick={()=>setOpenPickItem(true)}>Chọn sản phẩm</Button>
                <PickItemDialog open={openPickItem} onClose={()=>setOpenPickItem(false)}/>
              </Box>
              <Box className={classes.inputAddInfo}>
                <RadioGroup className={classes.radioRole} required={true}>
                  <FormControlLabel className={classes.radio} value="takeaway" name="role" label="Mang đi"  control={<Radio color="primary" />}/>
                  <FormControlLabel className={classes.radio} value="stay" name="role" label="Ăn tại chỗ"  control={<Radio color="primary"/>}/>
                </RadioGroup>
              </Box>             
              <Button type="submit" className={classes.btnSubmit}>ORDER</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
}
const useStyle = makeStyles(() => ({
  dialogAddItem: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  orderPaper: {
    position: 'relative',
    minWidth: '50%',
    maxHeight: '700px',
  },
  btnClose: {
    position: 'absolute',
    right: '-12px',
    top: '-13px',
    float: 'right',
  },
  iconClose: {
    fontSize: '40px',
    color: '#000'
  },
  boxAddItem: {
    padding: '16px'
  },
  inputAddInfo: {
    marginBottom: '15px'
  },
  inputLeft: {
    marginRight: '20px',
    width: '46%',
  },
  inputRight: {
    width: '50%',
  },

  btnSubmit: {
    width: '20%',
    height: '28px',
    backgroundColor: 'green'
  }
}));
export default AddOrderDialog;
