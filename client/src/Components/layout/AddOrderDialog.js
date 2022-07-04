import { Button, Dialog, DialogTitle, TextField, Box, RadioGroup, FormControlLabel, Radio, IconButton, Typography, SvgIcon, OutlinedInput, List, ListItem, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import { useState } from "react";
import PickItemDialog from "./PickItemDialog";

function AddOrderDialog(props) {
  const { open, onClose } = props;
  const classes = useStyle();

  const [openPickItem, setOpenPickItem] = useState(false);
  const [items, setItems] = useState()
  const [count, setCount] = useState({});

  const onGetItem = (items) => {
    setItems(items)
  }

  const onChangeCount = (index, event) => {
    let value = event.target.value;
    setCount(value.replace(/\D/,'')[index])
    // if(parseInt(value)>0 && parseInt(value) <1001) {
    //     setCount(value.replace(/\D/,''));
    // } else if (value === "") {
    //     setCount("")
    // }

}

  const onIncrease = () => {
      if(count < 999) setCount(count+1) ;
  }

  const onDecrease= () => {
      if(count > 1) setCount(count-1);
  }

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
                {/* {items ?
                  <List  className={classes.listItem}>
                    <Grid container spacing={4} style={{'padding': '8px 16px'}}>
                        <Grid item md={6}>
                          <Typography>Tên sản phẩm</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography>Số lượng</Typography>
                        </Grid>
                    </Grid>
                    {items.map((item,index) => (
                    <ListItem key={index}>
                    <Grid className={classes.amount} container spacing={4}>
                        <Grid item md={6}>
                          <Typography>{item}</Typography>
                        </Grid>
                        <Grid item md={6} className={classes.amountBox}>                        
                          <IconButton className={classes.btnSubPlus} onClick={onDecrease}>
                            <SvgIcon><path d="M19 13H5v-2h14v2z"></path></SvgIcon>
                          </IconButton>
                          <OutlinedInput className={classes.inputAmount} value={count[index]} onChange={event=>onChangeCount(index, event)} />
                          <IconButton className={classes.btnSubPlus} onClick={onIncrease}>
                            <SvgIcon><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></SvgIcon>
                          </IconButton>                     
                        </Grid>
                    </Grid>
                    </ListItem>
                    ))}
                  </List>
                     : ''
                } */}
                <PickItemDialog open={openPickItem} onClose={()=>setOpenPickItem(false)} onGetItem={onGetItem}/>
                {console.log('ITEMS: ',items)}
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
  listItem: {
    maxWidth: '40%'
  },
  btnSubmit: {
    width: '20%',
    height: '28px',
    backgroundColor: 'green'
  },
  amount: {
    display: 'flex',
  },
  amountBox: {
      display: 'flex',
  },
  btnSubPlus: {
      color: '#fff',
      width: '24px',
      height: '24px',
      borderRadius: '2px',
      backgroundColor: '#D4D5D8',
      '&:hover' : {
        backgroundColor: '#EF5845',
      }
  },
  inputAmount: {
      width: '50px',
      height: '24px',
      borderRadius: 0,
      '&>input': {
          padding: '4px 2px',
          textAlign: 'center',
          // fontSize: '20px!important',
          // fontWeight: '500!important',
      }
  },
}));
export default AddOrderDialog;
