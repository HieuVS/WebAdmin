import React from "react";
import { Button, Dialog, DialogTitle, TextField, Box, RadioGroup, FormControlLabel, Radio, IconButton, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import { useState } from "react";
import WarningMessage from "../WarningMessage";
import { updateStaff } from "../../../api/staffApi";
import TodayIcon from '@material-ui/icons/Today';
import { DatePicker } from "@material-ui/pickers";
import { formatDay } from "../../../utils/formatDate";

function UpdateStaffDialog(props) {
  const { open, onClose, staff } = props;
  const classes = useStyle();

  const [alert, setAlert] = useState(null);
  const [staffForm, setStaffForm] = useState({
    ...staff
  });
  const { name, phone, DoB, birthPlace, joinDate, role } = staffForm;

  
  const [selectedDoB, setSelectedDoB] = useState(new Date());
  const [selectedJoinDate, setSelectedJoinDate] = useState(new Date());
  const [openDoB, setOpenDoB] = useState(false);
  const [openJoinDate, setOpenJoinDate] = useState(false);

  const onChangeDoB = (date) => {
    setSelectedDoB(date);
    setStaffForm({...staffForm, DoB: selectedDoB})
  }
  console.log('selectedDoB:', selectedDoB)
  console.log('selectedJoinDate:', selectedJoinDate)
  
  const onChangeJoinDate = (date) => {
    setSelectedJoinDate(date);
    setStaffForm({...staffForm, joinDate: selectedJoinDate})
  }


  const onChangestaffForm = (event) => {
    setStaffForm({...staffForm, [event.target.name]: event.target.value })
  }

  //console.log("staffForm", staffForm);
  
  
  const onAddOrder = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await updateStaff(staffForm);
      if(!success) {
        setAlert({ type: "danger", message: message });
        setTimeout(() => setAlert(null), 5000);
      }
      else {
        console.log("OK ");
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
        <DialogTitle >Sửa thông tin nhân viên</DialogTitle>
        <WarningMessage info={alert}/>
        <Box className={classes.boxAddItem}>
          <form onSubmit={onAddOrder}>
            <Grid container spacing={1}>
              <Grid item md={6} className={classes.inputAddInfo}>
                <TextField label="Họ và tên" value={name} className={classes.inputLeft} name="name"  onChange={onChangestaffForm} required></TextField>
              </Grid>
              <Grid item md={6} className={classes.inputAddInfo}>
                <Box className={classes.customInput} >
                  <Box >
                    <TextField value={formatDay(DoB)} label="Ngày sinh nhật" className={classes.inputDate} />
                  </Box>
                  <Box className={classes.calendarIcon}>
                    <TodayIcon fontSize="large" onClick={()=>setOpenDoB(true)} style={{fontSize: '27px'}} />
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} className={classes.inputAddInfo}>
                <TextField label="Số điện thoại" value={phone} className={classes.inputRight} name="phone"  onChange={onChangestaffForm} required></TextField>
              </Grid>
              <Grid item md={6} className={classes.inputAddInfo}>
                <Box className={classes.customInput} >
                  <Box >
                    <TextField value={formatDay(joinDate)} label="Ngày vào công ty" className={classes.inputDate} />
                  </Box>
                  <Box className={classes.calendarIcon}>
                    <TodayIcon fontSize="large" onClick={()=>setOpenJoinDate(true)} style={{fontSize: '27px'}} />
                  </Box>
                </Box>
              </Grid>
              <Grid item md={12} className={classes.inputAddInfo}>
                <TextField label="Quê quán" value={birthPlace} fullWidth name="birthPlace"  onChange={onChangestaffForm} required></TextField>               
              </Grid>
              <Grid item className={classes.inputAddInfo}>
                <RadioGroup value={role} className={classes.radioRole} required={true}>
                  <FormControlLabel className={classes.radio} value="Owner" name="role" label="Owner" onChange={onChangestaffForm} control={<Radio color="primary" />}/>
                  <FormControlLabel className={classes.radio} value="Staff" name="role" label="Staff" onChange={onChangestaffForm} control={<Radio color="primary"/>}/>
                  <FormControlLabel className={classes.radio} value="Manager" name="role" label="Manager" onChange={onChangestaffForm} control={<Radio color="primary"/>}/>
                </RadioGroup>
              </Grid>             
            </Grid>
            <Box className={classes.boxSubmit}>
              <Button type="submit" className={classes.btnSubmit}>Chỉnh sửa</Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Dialog
        open={openDoB}
        onClose={() => {
          setOpenDoB(false);
        }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{
          style: { top: "203px", left: "138px", transformOrigin: "0px 0px" },
          className: classes.paperDialog,
        }}
      >
        <Box className="boxDate">
          <DatePicker 
            
            variant="static"
            value={selectedDoB}
            onChange={onChangeDoB}
            leftArrowButtonProps={{ classes: { root: classes.btnLeftArrow } }}
            rightArrowButtonProps={{ classes: { root: classes.btnRightArrow } }}
          />
        </Box>
      </Dialog>
      <Dialog
        open={openJoinDate}
        onClose={() => {
          setOpenJoinDate(false);
        }}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{
          style: { top: "203px", left: "138px", transformOrigin: "0px 0px" },
          className: classes.paperDialog,
        }}
      >
        <Box className="boxDate">
          <DatePicker 
            variant="static"
            value={selectedJoinDate}
            onChange={onChangeJoinDate}
            leftArrowButtonProps={{ classes: { root: classes.btnLeftArrow } }}
            rightArrowButtonProps={{ classes: { root: classes.btnRightArrow } }}
          />
        </Box>
      </Dialog>
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
  boxSubmit: {
    display: 'flex',
    justifyContent: 'center'
  },
  btnSubmit: {
    width: '20%',
    height: '28px',
    backgroundColor: '#00B2BF'
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
  customInput: {
    display: 'flex',
    alignItems: 'flex-end'
  }
}));
export default UpdateStaffDialog;
