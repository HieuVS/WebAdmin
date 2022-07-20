import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import {
  OutlinedInput,
  InputAdornment,
  SvgIcon,
  IconButton,
  Dialog,
  Box,
} from "@material-ui/core";
import clsx from "clsx";
import { DatePicker } from "@material-ui/pickers";
import { formatDatePicker } from "./formatDate";
import format from "date-fns/format";
import viLocale from "date-fns/locale/vi";

export default function DatePickerCustom() {
  const classes = useStyle();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  console.log("selectedDate: ", selectedDate)

  const handleDatePicker = () => {
    setOpenDate(true);
  };


  return (
    <>
      <OutlinedInput
        placeholder="Chọn ngày *"
        className={classes.chooseDate}
        fullWidth={true}
        required={true}
        onChange={handleDateChange}
        inputProps={{ className: classes.inputTimePicker }}
        value={formatDatePicker(selectedDate)}
        startAdornment={
          <InputAdornment position="start" className={classes.iconDate}>
            <SvgIcon>
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm5.56 10.46l5.93-5.93-1.06-1.06-4.87 4.87-2.11-2.11-1.06 1.06z"></path>
            </SvgIcon>
          </InputAdornment>
        }
        endAdornment={
          <IconButton
            edge="end"
            className={classes.btnChooseTime}
            onClick={handleDatePicker}
          >
            <SvgIcon>
              <path d="M7 10l5 5 5-5H7z"></path>
            </SvgIcon>
          </IconButton>
        }
      ></OutlinedInput>
      <Dialog
        open={openDate}
        onClose={() => setOpenDate(false)}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{
          style: { top: "150px", left: "10%", transformOrigin: "0px 0px" },
          className: classes.paperDialog,
        }}
      >
        <Box className="boxDate">
          <DatePicker 
            disableToolbar
            autoOk
            variant="static"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast={true}
            leftArrowButtonProps={{ classes: { root: classes.btnLeftArrow } }}
            rightArrowButtonProps={{ classes: { root: classes.btnRightArrow } }}
          />
        </Box>
      </Dialog>
    </>
  );
}
const useStyle = makeStyles(() => ({
  chooseDate: {
    paddingLeft: 0,
    marginBottom: 0,
  },
  inputTimePicker: {
    cursor: "pointer",
    padding: "16px 0 16px 8px",
  },
  iconDate: {
    width: "40px",
    height: "100%",
    minWidth: "50px",
    background: "#ebeced",
    maxHeight: "100%",
    minHeight: "50px",
    borderRight: "solid 0.5px #cecfd2",
    marginRight: 0,
    justifyContent: "center",
  },
  btnChooseTime: {
    color: "#979AA1",
    padding: "4px",
  },
  paperDialog: {
    display: 'flex',
    borderRadius: '6px',
    backgroundColor: '#ef5845',
  },
  btnLeftArrow: {
    width: '24px',
    height: '24px',
    padding: 0,
    justifyContent: 'flex-start',
    '&>*:first-child': {
        width: '24px',
        height: '24px',
    }
},
btnRightArrow: {
    width: '24px',
    height: '24px',
    padding: 0,
    justifyContent: 'flex-start',
    '&>*:first-child': {
        width: '24px',
        height: '24px',
    }
  },
  boxDate: {

  }
}));
