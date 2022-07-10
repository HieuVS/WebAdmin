import {
  Button, Dialog, DialogTitle, TextField, Box, RadioGroup, FormControlLabel, Radio, IconButton, Typography, SvgIcon, OutlinedInput, List, ListItem, Grid,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import { useEffect, useState } from "react";
import PickItemDialog from "./PickItemDialog";
import WarningMessage from "./WarningMessage";
import update from "immutability-helper";
import { updateOrder } from "../../api/orderApi";

function UpdateOrderDialog(props) {
  const { open, onClose, order } = props;
  const classes = useStyle();
  const [openPickItem, setOpenPickItem] = useState(false);
  const [alert, setAlert] = useState(null);
  const [itemList, setItemList] = useState();
  const [orderForm, setOrderForm] = useState({
    ...order,
    isTakeAway: order.isTakeAway ? "takeaway" : "stay",
  });
  const { customerName, phone, address, items, isTakeAway } = orderForm;

  useEffect(() => {
    //console.log("hehe")
    setItemList(order.items);
  }, []);

  console.log("orderForm: ", orderForm);
  // console.log("itemList: ", itemList);

  const onGetItem = (itemList) => {
    setItemList(itemList);
    setOrderForm({ ...orderForm, items: itemList });
  };
  const onChangeCount = (index, event) => {
    let value = parseInt(event.target.value.replace(/[^\d]+/g, ""));
    let updatedItem;
    if (isNaN(value))
      updatedItem = update(itemList, { [index]: { quantity: { $set: 1 } } });
    else
      updatedItem = update(itemList, {
        [index]: { quantity: { $set: value } },
      });
    setItemList(updatedItem);
    setOrderForm({ ...orderForm, items: updatedItem });

  };

  const onIncrease = (index, item) => {
    if (item.quantity < 999) {
      let updateIncrease = update(itemList, {
        [index]: { quantity: { $set: itemList[index].quantity + 1 } },
      });
      setItemList(updateIncrease);
      setOrderForm({ ...orderForm, items: updateIncrease });
    }
  };

  const onDecrease = (index, item) => {
    if (item.quantity > 1) {
      let updateDecrease = update(itemList, {
        [index]: { quantity: { $set: itemList[index].quantity - 1 } },
      });
      setItemList(updateDecrease);
      setOrderForm({ ...orderForm, items: updateDecrease });
    }
  };

  const onChangeOrderForm = (event) => {
    setOrderForm({
      ...orderForm,
      items: itemList,
      [event.target.name]: event.target.value,
    });
  };

  //.log("orderForm", orderForm);
  const onUpdateOrder = async (event) => {
    event.preventDefault();
    try {
        const updatedOrder = {...orderForm, isTakeAway: orderForm.isTakeAway === "takeaway" ? true: false}
        const response = await updateOrder(updatedOrder);
        if(!response.success) {
            setAlert({ type: "danger", message: response.message });
            setTimeout(() => setAlert(null), 5000);
        }
        else onClose();
        console.log("End")
    } catch (error) {
      console.log(error);
    }
  };
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
        <DialogTitle>Thêm đơn hàng mang đi</DialogTitle>
        <WarningMessage info={alert} />
        <Box className={classes.boxAddItem}>
          <form onSubmit={onUpdateOrder}>
            <Box>
              <Box className={classes.inputAddInfo}>
                <TextField
                  label="Họ và tên"
                  className={classes.inputLeft}
                  name="customerName"
                  value={customerName}
                  onChange={onChangeOrderForm}
                  required
                ></TextField>
                <TextField
                  label="Số điện thoại"
                  className={classes.inputRight}
                  name="phone"
                  value={phone}
                  onChange={onChangeOrderForm}
                  required
                ></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <TextField
                  label="Địa chỉ"
                  fullWidth
                  name="address"
                  value={address}
                  onChange={onChangeOrderForm}
                  required
                ></TextField>
              </Box>
              <Box className={classes.inputAddInfo}>
                <Button onClick={() => setOpenPickItem(true)}>
                  Chọn sản phẩm
                </Button>
                {itemList ? (
                  <List className={classes.listItem}>
                    <Grid container spacing={4} style={{ padding: "8px 16px" }}>
                      <Grid item md={6}>
                        <Typography>Tên sản phẩm</Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography>Số lượng</Typography>
                      </Grid>
                    </Grid>
                    {itemList.map((item, index) => (
                      <ListItem key={index}>
                        <Grid className={classes.amount} container spacing={4}>
                          <Grid item md={6}>
                            <Typography>{item.name}</Typography>
                          </Grid>
                          <Grid item md={6} className={classes.amountBox}>
                            <IconButton
                              className={classes.btnSubPlus}
                              onClick={() => onDecrease(index, item)}
                            >
                              <SvgIcon>
                                <path d="M19 13H5v-2h14v2z"></path>
                              </SvgIcon>
                            </IconButton>
                            <OutlinedInput
                              className={classes.inputAmount}
                              value={itemList[index].quantity}
                              onChange={(event) => onChangeCount(index, event)}
                              inputProps={{ min: 1, maxLength: 3 }}
                            />
                            <IconButton
                              className={classes.btnSubPlus}
                              onClick={() => onIncrease(index, item)}
                            >
                              <SvgIcon>
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                              </SvgIcon>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  ""
                )}
                <PickItemDialog
                  open={openPickItem}
                  onClose={() => setOpenPickItem(false)}
                  itemList={itemList === undefined ? [] : itemList}
                  onGetItem={onGetItem}
                />
              </Box>
              <Box className={classes.inputAddInfo}>
                <RadioGroup
                  value={isTakeAway}
                  className={classes.radioRole}
                  required={true}
                >
                  <FormControlLabel
                    className={classes.radio}
                    value="takeaway"
                    name="isTakeAway"
                    label="Mang đi"
                    onChange={onChangeOrderForm}
                    control={<Radio color="primary" />}
                  />
                  <FormControlLabel
                    className={classes.radio}
                    value="stay"
                    name="isTakeAway"
                    label="Ăn tại chỗ"
                    onChange={onChangeOrderForm}
                    control={<Radio color="primary" />}
                  />
                </RadioGroup>
              </Box>
              <Button type="submit" className={classes.btnSubmit}>
                ORDER
              </Button>
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
    position: "relative",
    minWidth: "50%",
    maxHeight: "700px",
  },
  btnClose: {
    position: "absolute",
    right: "-12px",
    top: "-13px",
    float: "right",
  },
  iconClose: {
    fontSize: "40px",
    color: "#000",
  },
  boxAddItem: {
    padding: "16px",
  },
  inputAddInfo: {
    marginBottom: "15px",
  },
  inputLeft: {
    marginRight: "20px",
    width: "46%",
  },
  inputRight: {
    width: "50%",
  },
  listItem: {
    maxWidth: "40%",
  },
  btnSubmit: {
    width: "20%",
    height: "28px",
    backgroundColor: "green",
  },
  amount: {
    display: "flex",
  },
  amountBox: {
    display: "flex",
  },
  btnSubPlus: {
    color: "#fff",
    width: "24px",
    height: "24px",
    borderRadius: "2px",
    backgroundColor: "#D4D5D8",
    "&:hover": {
      backgroundColor: "#EF5845",
    },
  },
  inputAmount: {
    width: "50px",
    height: "24px",
    borderRadius: 0,
    "&>input": {
      padding: "4px 2px",
      textAlign: "center",
      // fontSize: '20px!important',
      // fontWeight: '500!important',
    },
  },
}));
export default UpdateOrderDialog;
