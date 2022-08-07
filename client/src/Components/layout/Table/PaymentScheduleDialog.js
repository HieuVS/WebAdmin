import {
  Typography,
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  List,
  Grid,
  ListItem,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect, useMemo } from "react";
import { formatCash, formatStringtoNum } from "../../../utils/formatCash";
import WarningMessage from "../WarningMessage";
import CancelIcon from "@material-ui/icons/Cancel";
import { getDiscount } from "../../../api/discountApi";
import { useSelector } from "react-redux";
import { makeOrderSchedule, updateTablePay } from "../../../api/scheduleApi";
import { createPayment } from "../../../api/paymentApi";

function PaymentScheduleDialog({ open, onClose, customerInfo, table, itemList, onCloseParent}) {
  const classes = useStyle();
  //console.log("itemList", itemList);

  var tamTinh = useMemo(()=> {
    //console.log('reRender')
    if(Array.isArray(itemList.items) && itemList.items.length !== 0) {
      let tongTien = 0;
      for(let i = 0; i < itemList.items.length; i++) {
        tongTien += itemList.items[i].amount;
      }
      return tongTien;
    }
    return 0;
  },[itemList]);
  console.log('tamTinh', tamTinh)

  const [alert, setAlert] = useState(null);
  const [haveDiscount, setHaveDiscount] = useState();
  const [discount, setDiscount] = useState()
  const [inputDiscount, setInputDiscount] = useState('');
  const [amount, setAmount] = useState();
  const [warning, setWarning] = useState(false);


  console.log('amount: ', amount)

  useEffect(() => {
    getDiscount();
  }, []);
  const discountList = useSelector((state) => state.discount);

  // console.log(thanhTien);

  const onCheckDiscount = () => {
    let checkDiscount = discountList.discounts.findIndex(item => item.code.includes(inputDiscount))
    if(checkDiscount !== -1) { //co Discount
      let percent = discountList.discounts[checkDiscount];
      console.log('percent', percent);
      setDiscount(percent);
      setHaveDiscount(true);
      setAmount(tamTinh - Math.round(tamTinh*percent.discount))
      setInputDiscount("");
    }  
    else {
      setDiscount(false);
      setWarning(true);
      setTimeout(() => setWarning(false), 3000);
      setInputDiscount("");
      
    }
  }
  
  const onSubmitTable = async () => {
    onCloseParent(false);
    onClose();
      const orderPromise = makeOrderSchedule({
        ...customerInfo.customer,
        ...itemList,
        discount: discount ? discount._id : null,
        checkTakeAway: 'stay'
      });

      const paymentPromise = createPayment({
        customer: {...customerInfo.customer},
        ...itemList,
        discount: discount ? discount._id : null,
        tax: 0.1,
        isTakeAway: false,
        totalAmount: formatStringtoNum(document.getElementById('totalAmount').textContent),
      }).then(result => console.log(result)).catch(error=> console.log(error));

    await Promise.allSettled([updateTablePay(table), orderPromise, paymentPromise])
      .then((results) => console.log(results))
      .catch((err) => console.log(err));
  }

  return (
    <Dialog
      open={open}
      maxWidth={false}
      className={classes.dialogAddItem}
      PaperProps={{ className: classes.orderPaper }}
    >
      <Box>
        <IconButton className={classes.btnClose} onClick={onClose}>
          <CancelIcon className={classes.iconClose} />
        </IconButton>
        <DialogTitle className={classes.dialogTitle}>Thành tiền</DialogTitle>
        <WarningMessage info={alert} />
        <Box className={classes.boxAddItem}>
          <Box className={classes.titlePay}>
            <Typography variant="h6" >Danh sách sản phẩm</Typography>
          </Box>
          <List className={classes.listItem}>
            <ListItem >
              <Grid container spacing={2} style={{ padding: "8px" }}>
                <Grid item md={4}>
                  <Typography>Tên sản phẩm</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography>Số lượng</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography>Giá tiền</Typography>
                </Grid>
              </Grid>
            </ListItem>
            {Array.isArray(itemList.items) && itemList.items.length !== 0 ?
            itemList.items.map((item, index) => (
              <ListItem key={index} >
                <Grid className={classes.itemList} container spacing={2}>
                  <Grid item md={4}>
                    <Typography>{item.name}</Typography>
                  </Grid>
                  <Grid item md={4} className={classes.amountBox}>
                    <Typography className={classes.inputAmount} >{item.quantity}</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>{formatCash(item.amount)}đ</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            )) : ''
            }
            <Box className={classes.boxAmount}>
              <Typography variant="h6">Tạm tính</Typography>
              {tamTinh!== undefined ? (
              <Typography variant="h6">{formatCash(tamTinh)}đ</Typography>
              ) : ''}
            </Box>
            {haveDiscount ? (
              <Box>
                <Box className={classes.amountDiscount}>
                  <Typography className={classes.discountPerCent}>-{discount.discount*100}%</Typography>
                  <Typography className={classes.discountPerCent}>{formatCash(amount)}đ</Typography>
                </Box>
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Thuế</Typography>
                  {tamTinh!== undefined ? (
                  <Typography variant="h6">10%</Typography>
                  ) : ''}
                </Box>
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Thành Tiền</Typography>
                  {tamTinh!== undefined ? (
                      <Typography variant="h6">{formatCash(amount*11/10)}đ</Typography>
                    ) : ''}
                </Box>
                <Box className={classes.boxDiscount}>
                  <TextField className={classes.inputDiscount} variant="outlined" label="Nhập mã giảm giá tại đây" value={inputDiscount} onChange={e=> setInputDiscount(e.target.value)}/>
                  <Button variant="contained" className={classes.btnApply} onClick={onCheckDiscount}>Apply</Button>
                </Box>
                {warning ? (
                <Box className={classes.warningDiscount}>
                  <Typography className={classes.warningContent}>*Mã giảm giá không hợp lệ</Typography>
                </Box>
                ) : ''}
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Tổng tiền cần thanh toán</Typography>
                  {tamTinh!== undefined ? (
                      <Typography variant="h6" id="totalAmount">{formatCash(amount*11/10)}đ</Typography>
                    ) : ''}
                </Box>
              </Box>
            ) : (
              <Box>
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Thuế</Typography>
                  {tamTinh!== undefined ? (
                  <Typography variant="h6">10%</Typography>
                  ) : ''}
                </Box>
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Thành Tiền</Typography>
                  {tamTinh!== undefined ? (
                      <Typography variant="h6">{formatCash(tamTinh*11/10)}đ</Typography>
                    ) : ''}
                </Box>
                <Box className={classes.boxDiscount}>
                  <TextField className={classes.inputDiscount} variant="outlined" label="Nhập mã giảm giá tại đây" value={inputDiscount} onChange={e=> setInputDiscount(e.target.value)}/>
                  <Button variant="contained" className={classes.btnApply} onClick={onCheckDiscount}>Apply</Button>
                </Box>
                {warning ? (
                <Box className={classes.warningDiscount}>
                  <Typography className={classes.warningContent}>*Mã giảm giá không hợp lệ</Typography>
                </Box>
                ) : ''}
                <Box className={classes.boxAmount}>
                  <Typography variant="h6">Tổng tiền cần thanh toán</Typography>
                  {tamTinh!== undefined ? (
                      <Typography variant="h6" id="totalAmount">{formatCash(tamTinh*11/10)}đ</Typography>
                    ) : ''}
                </Box>
              </Box>
            )}
          </List>
            <Box className={classes.boxSubmit}>
              <Button
                onClick={()=>{onSubmitTable()}}
                variant="contained"
                className={classes.btnSubmit}
              >
                Thanh toán
              </Button>
            </Box>
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
    position: "relative",
    minWidth: "50%",
    minHeight: "600px",
  },
  btnClose: {
    position: "absolute",
    right: "0px",
    top: "-5px",
    float: "right",
  },
  iconClose: {
    fontSize: "40px",
    color: "#000",
  },
  boxAddItem: {
    padding: "16px",
  },
  dialogTitle: {
    backgroundColor: "#20B2AA",
    display: "flex",
    justifyContent: "center",
  },
  titlePay: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: ' flex',
    justifyContent: 'center'
  },
  listItem: {
    paddingLeft: '15%'
  },
  itemList: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },
  boxAmount: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '15px',
    marginLeft: '18px',
    justifyContent: 'space-between',
    maxWidth: '75%'
  },
  boxDiscount: {
    marginLeft: '16px',
    paddingTop: '15px',
    display: 'flex',
    alignItems: 'center',
    //height: '50px'
  },
  inputDiscount:{
    width: '57%'
  },
  btnApply: {
    backgroundColor: '#EF5845',
    height: '60px',
    borderRadius: '10px'
  },
  amountDiscount: {
    width: '78%', 
    height: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  discountPerCent: {
    color: 'red',
  },
  warningDiscount: {
    margin: '6px 20px'
  },
  warningContent: {
    color: 'red'
  },
  boxSubmit: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  btnSubmit: {
    backgroundColor: '#EF5845',
    borderRadius: '10px'
  }
}));
export default PaymentScheduleDialog;
