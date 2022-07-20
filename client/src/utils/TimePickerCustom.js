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
import { TimePicker } from "@material-ui/pickers";
import { formatTimePicker } from "./formatDate";

export default function TimePickerCustom() {
  const classes = useStyle();
  const now = new Date();
  //const current = now.getHours() + ':' + now.getMinutes();
  const [selectedDate, handleDateChange] = useState(now);
  const [openHour, setOpenHour] = useState(false);

  const handleTimePicker = () => {
    setOpenHour(true);
  };

  const onChangeDate = (date) => {
    //if (selectedDate !== "") setSelectedDate(formatDate(date));
  };
  return (
    <>
      <OutlinedInput
        placeholder="Chọn giờ *"
        className={classes.chooseTime}
        fullWidth={true}
        required={true}
        value={formatTimePicker(selectedDate)}
        onChange={handleDateChange}
        inputProps={{ className: classes.inputTimePicker }}
        startAdornment={
          <InputAdornment position="start" className={classes.iconDate}>
            <SvgIcon>
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
            </SvgIcon>
          </InputAdornment>
        }
        endAdornment={
          <IconButton edge="end" onClick={handleTimePicker} className={classes.btnChooseTime}>
            <SvgIcon>
              <path d="M7 10l5 5 5-5H7z"></path>
            </SvgIcon>
          </IconButton>
        }
      ></OutlinedInput>
      <Dialog
        open={openHour}
        onClose={() => setOpenHour(false)}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{
          style: { top: "150px", left: "10%", transformOrigin: "0px 0px" },
          className: classes.paperDialog,
        }}
      >
        <Box className="boxDate">
          <TimePicker
          clearable
          variant="static"
          //ampm={false}
          orientation="landscape"
          minutesStep={30}
          label="24 hours"
          value={selectedDate}
          onChange={handleDateChange}
      />
        </Box>
      </Dialog>
    </>
  );
}
const useStyle = makeStyles(() => ({
  chooseTime: {
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
}));
