import { makeStyles, createTheme } from "@material-ui/core/styles";
import { useState } from "react";
import { Box, Typography, Paper, Dialog, TextField, Button, MenuItem, ThemeProvider, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";
import DateAndTimePicker from "../../../utils/DateAndTimePicker";
import { updateTable } from "../../../api/tableApi";
import formatDate from "../../../utils/formatDate";

const tableNumber = [1,2,3,4,5,6,7,8];
export default function UpdateTableDialog({ open, item, onClose }) {
  const classes = useStyle();
  const [tableForm, setTableForm] = useState({
    ...item,
    startAt: formatDate(item.startAt),
    active: item.isActive.toString()
  });
  const { number, headCount, startAt, active } = tableForm;

  const onGetDate = (date) => {
    setTableForm({ ...tableForm, startAt: date });
  };

  const onChangeDiscountForm = (event) => {
    setTableForm({ ...tableForm, [event.target.name]: event.target.value });
  };
  //console.log("tableForm: ", item);

  const onUpdateTable = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await updateTable(tableForm);
      if (!success) console.log("Error: ", message);
      else {
        console.log("update successfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        PaperProps={{ className: classes.pickItemPaper }}
      >
        <Paper className={classes.paperItem}>
          <form onSubmit={onUpdateTable}>
            <Box className={classes.boxInforTable}>
              <Typography variant="h5" className={classes.itemTitle}>
                isActive:
              </Typography>
              <RadioGroup
                value={active}
                className={classes.radioRole}
                required={true}
              >
                <FormControlLabel
                  className={classes.radio}
                  value="true"
                  name="active"
                  label="Có"
                  onChange={onChangeDiscountForm}
                  control={<Radio color="primary" />}
                />
                <FormControlLabel
                  className={classes.radio}
                  value="false"
                  name="active"
                  label="Không"
                  onChange={onChangeDiscountForm}
                  control={<Radio color="primary" />}
                />
              </RadioGroup>
            </Box>
            <Box className={classes.boxInforTable}>
              <Typography variant="h5" className={classes.itemTitle}>
                Bàn số:
              </Typography>
              <TextField
                value={number}
                onChange={onChangeDiscountForm}
                name="number"
                variant="outlined"
                select
                label="Chọn số bàn"
                className={classes.selectNumber}
              >
                {tableNumber.map((option, key) => (
                  <MenuItem key={key} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.boxInforTable}>
              <Typography variant="h5" className={classes.itemTitle}>
                Thời gian
              </Typography>
              <Box className={classes.inputPicker}>
                <DateAndTimePicker onGetDate={onGetDate} date={item.startAt} />
              </Box>
            </Box>
            <Box className={classes.boxInforTable}>
              <Typography variant="h5" className={classes.itemTitle}>
                Số người lớn:
              </Typography>
              <TextField
                className={classes.headCountInput}
                value={headCount}
                select
                name="headCount"
                variant="outlined"
                onChange={onChangeDiscountForm}
              >
                {tableNumber.map((option, key) => (
                  <MenuItem key={key} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.boxSubmit}>
              <Button
                type="submit"
                variant="contained"
                className={classes.btnSubmit}
              >
                Sửa thông tin
              </Button>
            </Box>
          </form>
        </Paper>
      </Dialog>
    </ThemeProvider>
  );
}
const useStyle = makeStyles(() => ({
  pickItemPaper: {
    display: "block",
    width: "60%",
    padding: "20px",
  },
  paperContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "90%",
    minHeight: "88vh",
    //maxHeight:'85vh'
  },
  categoryHeader: {
    margin: "30px",
  },
  containerDiscount: {
    width: "100%",
    height: "65vh",
    margin: 0,
  },
  itemDiscount: {
    maxHeight: "240px",
  },
  paperItem: {
    position: "relative",
    border: "3px dashed #EF5845",
    borderRadius: "6px",
    boxShadow: "5px 5px 1px -1px rgb(0 0 0 / 20%)",
    padding: "20px",
    "&:hover": {
      color: "#EF5845",
    },
  },
  itemTitle: {
    color: "#008080",
    lineHeight: "normal",
  },
  deleteDiscount: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  boxContent: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    alignItems: "flex-end",
  },
  boxSubmit: {
    display: "flex",
    justifyContent: "center",
  },
  btnSubmit: {
    backgroundColor: "#20B2AA",
    borderRadius: "6px",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#EF5845",
    },
  },
  boxTableNumber: {
    display: "flex",
  },
  selectNumber: {
    maxHeight: "60px",
    width: "170px",
  },
  boxInforTable: {
    marginTop: "12px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputPicker: {
    display: "flex",
    maxWidth: "50%",
    height: "50px",
  },
  headCountInput: {
    width: "170px",
  },
  radioRole: {
    display: 'flex',
    marginLeft: '6px',
    marginTop: '8px',
    flexDirection:'row'
  },
}));

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: "12px 8px",
      },
    },
  },
});