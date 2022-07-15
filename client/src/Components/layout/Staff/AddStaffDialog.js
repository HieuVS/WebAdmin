import React from "react";
import { Button, Dialog, DialogTitle, TextField, Box, RadioGroup, FormControlLabel, Radio, IconButton, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import { useState } from "react";
import WarningMessage from "../WarningMessage";
import update from 'immutability-helper';
import { createStaff } from "../../../api/staffApi";
import CustomDatePicker from "../CustomDatePicker";

function AddOrderDialog(props) {
  const { open, onClose } = props;
  const classes = useStyle();
  const [alert, setAlert] = useState(null);
  const [staffForm, setStaffForm] = useState({
    employeeName: '',
    phone: '',
    DoB: null,
    birthPlace: '',
    joinDate: null,
    role: 'Staff'
  });
  const { employeeName, phone, DoB, birthPlace, joinDate, role } = staffForm;

  // console.log("staffForm: ", staffForm);
  const onGetDate = (date, type) => {
    if(type ==='DoB') setStaffForm({...staffForm, birthPlace: date});
    else if (type === 'joinDate') setStaffForm({...staffForm, joinDate: date});
    else console.log("Error type: ", type);
  }
  const [sinhNhat, setSinhNhat] = useState();
  const [ngayVao, setNgayVao] = useState();
  const onGetSinhNhat = (date) => {

  }

  const onGetNgayVao = (date) => {

  }

  const getDoB = React.useRef();
  const getJoinDate = React.useRef()

  const onGetDate2 = () => {
    getDoB.current.returnState();
  }

  const onGetDate3 = () => {
    getJoinDate.current.returnState();
  }

  const onChangestaffForm = (event) => {
    setStaffForm({...staffForm, [event.target.name]: event.target.value })
  }

  //console.log("staffForm", staffForm);
  
  
  const onAddOrder = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await createStaff(staffForm);
      if(!success) {
        setAlert({ type: "danger", message: message });
        setTimeout(() => setAlert(null), 5000);
      }
      else {
        console.log("OK ");
        setStaffForm({
          customerName: "",
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
  console.log('DoB:', DoB)
  console.log('joinDate:', joinDate)

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
        <DialogTitle >Thêm thông tin nhân viên</DialogTitle>
        <WarningMessage info={alert}/>
        <Box className={classes.boxAddItem}>
          <form onSubmit={onAddOrder}>
            <Grid container spacing={1}>
              <Grid item md={6} className={classes.inputAddInfo}>
                <TextField label="Họ và tên" value={employeeName} className={classes.inputLeft} name="employeeName"  onChange={onChangestaffForm} required></TextField>
              </Grid>
              <Grid item md={6} className={classes.inputAddInfo}>
                <CustomDatePicker ref={getDoB} label="Ngày sinh" onGetDate={onGetDate} type="DoB" name="DoB" pickDate='DoB'/>
                <Button onClick={onGetDate2}/>
              </Grid>
              <Grid item md={6} className={classes.inputAddInfo}>
                <TextField label="Số điện thoại" value={phone} className={classes.inputRight} name="phone"  onChange={onChangestaffForm} required></TextField>
              </Grid>
              <Grid item md={6} className={classes.inputAddInfo}>
                <CustomDatePicker ref={getJoinDate} label="Ngày vào công ty" onGetDate={onGetDate} type="joinDate" name="joinDate"/>
                <Button onClick={onGetDate3}/>
              </Grid>
              <Grid item md={12} className={classes.inputAddInfo}>
                <TextField label="Quê quán" value={birthPlace} fullWidth name="birthPlace"  onChange={onChangestaffForm} required></TextField>               
              </Grid>
              <Grid item className={classes.inputAddInfo}>
                <RadioGroup value={role} className={classes.radioRole} required={true}>
                  <FormControlLabel className={classes.radio} value="Owner" name="role" label="Owner" onChange={onChangestaffForm} control={<Radio color="primary" />}/>
                  <FormControlLabel className={classes.radio} value="Staff" name="role" label="Staff" onChange={onChangestaffForm} control={<Radio color="primary"/>}/>
                </RadioGroup>
              </Grid>             
            </Grid>
            <Button type="submit" className={classes.btnSubmit}>ORDER</Button>
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
    maxWidth: '50%',
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
    display: 'flex',
    marginBottom: '15px'
  },
  inputLeft: {
    //marginRight: '20px',
    //width: '46%',
  },
  inputRight: {
    //width: '50%',
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
