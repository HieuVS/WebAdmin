import { Button, Dialog, DialogTitle, TextField, Box, RadioGroup, FormControlLabel, Radio, IconButton, Typography, SvgIcon, OutlinedInput, List, ListItem, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import { useEffect, useState, useRef } from "react";
import PickItemScheduleDialog from "./PickItemScheduleDialog";
import WarningMessage from "../WarningMessage";
import update from 'immutability-helper';
import store from "../../../redux/store";
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { useSelector } from "react-redux";
import React, { forwardRef, useImperativeHandle } from "react";
import { formatCash } from "../../../utils/formatCash";
import PaymentScheduleDialog from "./PaymentScheduleDialog";

const AddScheduleDialog = forwardRef((props, ref) => {
  //console.log('Re=Render AddScheduleDialog');
  const { table } = props;
  const tableId = table._id;
  
  const classes = useStyle();
  const refItem = useRef();
  
  const [open, setOpen] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [customer, setCustomer] = useState({});
  const [itemListSchedule, setItemListSchedule] = useState({});
  useImperativeHandle(ref, ()=> ({
    open: handleOpen,
  }))

  const handleOpen = () => {
    //setTable(table)
    setOpen(true)
  }
  
  const handleOpenItem = () => {
    refItem.current.openItem();
  }

  const [scheduleForm, setScheduleForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const { name, phone, address } = scheduleForm;

  const itemSchedule = useSelector(state=> state.schedule).schedule
  const itemList = itemSchedule.filter((item) => 
    item.table._id === tableId
  );
  const danhSachMonAn = itemList[0] ? itemList[0].items : [];
  //console.log('scheduleForm? ', scheduleForm)
  //console.log('itemSchedule', itemSchedule)

  const onChangeScheduleForm = (event) => {
    setScheduleForm({...scheduleForm, [event.target.name]: event.target.value });
    //store.dispatch({type: 'SET_DATA_SCHEDULE', payload: scheduleForm})
  }

  const onChangeCount = (index, event) => {
    let value = parseInt(event.target.value.replace(/[^\d]+/g,''));
    let updatedItem;
    if(isNaN(value)) {
      updatedItem = update(danhSachMonAn, {
        [index]: {quantity: {$set: 1}, amount: {$set: danhSachMonAn[index].price}}
      });
      //console.log('updatedItem 1', updatedItem)
      store.dispatch({type: 'UPDATE_ITEM_SCHEDULE', payload : updatedItem, id: tableId})
    }  
    else {
      updatedItem = update(danhSachMonAn, {
        [index]: {quantity: {$set: value}, amount: {$set: danhSachMonAn[index].price * value}}
      }); 
      //console.log('updatedItem 2', updatedItem)
      store.dispatch({type: 'UPDATE_ITEM_SCHEDULE', payload : updatedItem, id: tableId})
    }
  }

  const onIncrease = (index, item) => {
    if(item.quantity < 999) {        
      let updateIncrease = update(danhSachMonAn, {
        [index]: {quantity: {$set: item.quantity+1 }, amount : {$set : item.price * (item.quantity+1) }},
        //[index]: {amount : {$set : danhSachMonAn[index].price * danhSachMonAn[index].quantity+1 }}
      });
      store.dispatch({type: 'UPDATE_ITEM_SCHEDULE', payload : updateIncrease, id: tableId})
      //setItemList(updateIncrease);
      //setScheduleForm({...scheduleForm, items: updateIncrease})
    }
  }

  const onDecrease = (index, item) => {
    if(item.quantity > 1) {
      let updateDecrease =  update(danhSachMonAn, {
        [index]: {quantity: {$set: item.quantity-1 }, amount : {$set : item.price * (item.quantity-1) }},
        //[index]: {quantity: {$set: danhSachMonAn[index].quantity-1 }}
      });
      store.dispatch({type: 'UPDATE_ITEM_SCHEDULE', payload : updateDecrease, id: tableId})

      //setItemList(updateDecrease);
      //setScheduleForm({...scheduleForm, items: updateDecrease})
    }
  }

  const onDeleteItem = (index) => {
    let updateDelete =  update(danhSachMonAn,{ $splice: [[index, 1]]  });
    store.dispatch({type: 'UPDATE_ITEM_SCHEDULE', payload : updateDelete, id: tableId})

  }

  const onAddPayment =  () => {
    setCustomer({customer : scheduleForm});
    setItemListSchedule({items: danhSachMonAn})
    setOpenPay(true)
  }

  const onCloseDialog = () => {
    setScheduleForm({
      name: "",
      phone: "",
      address: "",
    })
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      maxWidth={false}
      className={classes.dialogAddItem}
      PaperProps={{className: classes.orderPaper}}
    >
      <Box>
        <IconButton className={classes.btnClose} onClick={onCloseDialog}>
          <CancelIcon className={classes.iconClose}/>
        </IconButton>        
        <DialogTitle >Gọi món</DialogTitle>
        <Box className={classes.boxAddItem}>
            <Box >
              <Box className={classes.inputAddInfo}>
                <TextField label="Họ và tên" className={classes.inputLeft} name="name" value={name} onChange={onChangeScheduleForm} required></TextField>
                <TextField label="Số điện thoại" className={classes.inputRight} name="phone" value={phone} onChange={onChangeScheduleForm} required></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <TextField label="Địa chỉ" fullWidth name="address" value={address} onChange={onChangeScheduleForm}></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <Button onClick={handleOpenItem}>Chọn sản phẩm</Button>
                {Array.isArray(danhSachMonAn) && danhSachMonAn.length !== 0 ?
                  <List className={classes.listItem}>
                    <Grid container spacing={4} style={{'padding': '8px 16px'}}>
                        <Grid item md={4}>
                          <Typography>Tên sản phẩm</Typography>
                        </Grid>
                        <Grid item md={3}>
                          <Typography>Số lượng</Typography>
                        </Grid>
                        <Grid item md={3}>
                          <Typography>Giá tiền</Typography>
                        </Grid>
                    </Grid>
                    {danhSachMonAn.map((item,index) => (
                    <ListItem key={index}>
                    <Grid className={classes.amount} container spacing={4}>
                        <Grid item md={4}>
                          <Typography>{item.name}</Typography>
                        </Grid>
                        <Grid item md={3} className={classes.amountBox}>                        
                          <IconButton className={classes.btnSubPlus} onClick={()=>onDecrease(index, item)}>
                            <SvgIcon><path d="M19 13H5v-2h14v2z"></path></SvgIcon>
                          </IconButton>
                          <OutlinedInput className={classes.inputAmount} value={danhSachMonAn[index].quantity} onChange={event=>onChangeCount(index, event)} 
                            inputProps={{min:1, maxLength:3}}/>
                          <IconButton className={classes.btnSubPlus} onClick={()=>onIncrease(index, item)}>
                            <SvgIcon><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></SvgIcon>
                          </IconButton>                                               
                        </Grid>
                        <Grid item md={3}>
                          <Typography>{formatCash(item.amount)}đ</Typography>
                        </Grid>
                        <Grid item md={2}>
                          <IconButton className={classes.btnDeleteItem} onClick={()=>onDeleteItem(index)}>
                            <HighlightOffSharpIcon className={classes.iconDeleteItem}/>
                          </IconButton>
                        </Grid>
                    </Grid>
                    </ListItem>
                    ))}
                  </List>
                     : ''
                }
                <PickItemScheduleDialog ref={refItem} tableId={tableId}/>
                <PaymentScheduleDialog open={openPay} onCloseParent={setOpen} onClose={()=>setOpenPay(false)} table={table} itemList={itemListSchedule} customerInfo={customer}/>
              </Box>
              <Box className={classes.btnSubmitBox}>
                <Button className={classes.btnSubmit} onClick={onAddPayment}>Kế tiếp</Button>
              </Box>            
            </Box>
        </Box>
      </Box>
    </Dialog>
  );
});

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
    maxWidth: '90%'
  },
  btnSubmitBox: {
    justifyContent: 'center',
    display: 'flex',
  },
  btnSubmit: {
    width: '20%',
    height: '28px',
    backgroundColor: '#20B2AA',
    '&:hover': {
      backgroundColor: '#EF5845',
    }
  },
  amount: {
    display: 'flex',
    alignItems: 'center'
  },
  btnDeleteItem: {

  },
  iconDeleteItem: {
    fontSize: '18px'
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
export default AddScheduleDialog;
