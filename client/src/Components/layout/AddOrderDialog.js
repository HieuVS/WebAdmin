import { Button, Dialog, DialogTitle, TextField, Box, RadioGroup, FormControlLabel, Radio, IconButton, Typography, SvgIcon, OutlinedInput, List, ListItem, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import { useEffect, useState } from "react";
import PickItemDialog from "./PickItemDialog";
import WarningMessage from "./WarningMessage";
import update from 'immutability-helper';
import { postOrder } from "../../api/orderApi";

function AddOrderDialog(props) {
  const { open, onClose } = props;
  const classes = useStyle();

  const [openPickItem, setOpenPickItem] = useState(false);
  const [alert, setAlert] = useState(null);
  const [itemList, setItemList] = useState()
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    items: [],
    checkTakeAway: "takeaway",
  });
  const { name, phone, address, items, checkTakeAway } = orderForm;
  

  const onGetItem = (itemList) => {
    setItemList(itemList);
    setOrderForm({...orderForm, items: itemList });
  }
  // console.log("orderForm: ", orderForm);
  // console.log("list ITEM: ", itemList);
  const onChangeCount = (index, event) => {
    let value = parseInt(event.target.value.replace(/[^\d]+/g,''));
    let updatedItem;
    if(isNaN(value)) updatedItem = update(itemList, {[index]: {quantity: {$set: 1}}}); 
    else updatedItem = update(itemList, {[index]: {quantity: {$set: value}}}); 
    setItemList(updatedItem);
    setOrderForm({...orderForm, items: updatedItem})
    // let newList = [...itemList];
    // newList[index].quantity = value;
    // setItemList(newList);
}

  const onIncrease = (index, item) => {
    if(item.quantity < 999) {
      let updateIncrease = update(itemList, {[index]: {quantity: {$set: itemList[index].quantity+1 }}});
      setItemList(updateIncrease);
      setOrderForm({...orderForm, items: updateIncrease})
    }
  }

  const onDecrease= (index, item) => {
    if(item.quantity > 1) {
      let updateDecrease = update(itemList, {[index]: {quantity: {$set: itemList[index].quantity-1 }}});
      setItemList(updateDecrease);
      setOrderForm({...orderForm, items: updateDecrease})
    }
  }

  const onChangeOrderForm = (event) => {
    setOrderForm({...orderForm, items: itemList, [event.target.name]: event.target.value })
  }

  //console.log("orderForm", orderForm);
  const onAddOrder = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await postOrder(orderForm);
      if(!success) {
        setAlert({ type: "danger", message: message });
        setTimeout(() => setAlert(null), 5000);
      }
      else {
        console.log("OK ");
        setOrderForm({
          name: "",
          phone: "",
          address: "",
          items: [],
          checkTakeAway: "takeaway",
        })
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
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
        <DialogTitle >Th??m ????n h??ng mang ??i</DialogTitle>
        <WarningMessage info={alert}/>
        <Box className={classes.boxAddItem}>
          <form onSubmit={onAddOrder}>
            <Box >
              <Box className={classes.inputAddInfo}>
                <TextField label="H??? v?? t??n" className={classes.inputLeft} name="name" value={name} onChange={onChangeOrderForm} required></TextField>
                <TextField label="S??? ??i???n tho???i" className={classes.inputRight} name="phone" value={phone} onChange={onChangeOrderForm} required></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <TextField label="?????a ch???" fullWidth name="address" value={address} onChange={onChangeOrderForm} required></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <Button onClick={()=>setOpenPickItem(true)}>Ch???n s???n ph???m</Button>
                {itemList ?
                  <List className={classes.listItem}>
                    <Grid container spacing={4} style={{'padding': '8px 16px'}}>
                        <Grid item md={6}>
                          <Typography>T??n s???n ph???m</Typography>
                        </Grid>
                        <Grid item md={6}>
                          <Typography>S??? l?????ng</Typography>
                        </Grid>
                    </Grid>
                    {itemList.map((item,index) => (
                    <ListItem key={index}>
                    <Grid className={classes.amount} container spacing={4}>
                        <Grid item md={6}>
                          <Typography>{item.name}</Typography>
                        </Grid>
                        <Grid item md={6} className={classes.amountBox}>                        
                          <IconButton className={classes.btnSubPlus} onClick={()=>onDecrease(index, item)}>
                            <SvgIcon><path d="M19 13H5v-2h14v2z"></path></SvgIcon>
                          </IconButton>
                          <OutlinedInput className={classes.inputAmount} value={itemList[index].quantity} onChange={event=>onChangeCount(index, event)} 
                            inputProps={{min:1, maxLength:3}}/>
                          <IconButton className={classes.btnSubPlus} onClick={()=>onIncrease(index, item)}>
                            <SvgIcon><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></SvgIcon>
                          </IconButton>                     
                        </Grid>
                    </Grid>
                    </ListItem>
                    ))}
                  </List>
                     : ''
                }
                <PickItemDialog open={openPickItem} onClose={()=>setOpenPickItem(false)} itemList={itemList===undefined ? [] : itemList} onGetItem={onGetItem}/>
              </Box>
              <Box className={classes.inputAddInfo}>
                <RadioGroup value={checkTakeAway} className={classes.radioRole} required={true}>
                  <FormControlLabel className={classes.radio} value="takeaway" name="checkTakeAway" label="Mang ??i" onChange={onChangeOrderForm}  control={<Radio color="primary" />}/>
                  <FormControlLabel className={classes.radio} value="stay" name="checkTakeAway" label="??n t???i ch???" onChange={onChangeOrderForm}  control={<Radio color="primary"/>}/>
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
