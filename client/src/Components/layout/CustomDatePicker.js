import React from "react";
import { TextField, Box } from "@material-ui/core";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import vilocale from 'date-fns/locale/vi';
import TodayIcon from '@material-ui/icons/Today';
import { makeStyles } from "@material-ui/core/styles";
registerLocale('vi', vilocale)


export default function CustomDatePicker(props) {
  const { onGetDate, label, type } = props;
  const classes = useStyle();
  const [selectedDate, setSelectedDate] = useState(new Date());
  //console.log("selectedDate: ",selectedDate)
  const returnState = () => {
    console.log(selectedDate)
  }
  const years = Array.from(Array(new Date().getFullYear() - 1949), (_, i) => (i + 1950).toString())
  const months = [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ];
  const onClickDateType = () => {
    
  }
  const handleDateSelect = (date, event) => {
    //console.log(ref)
    //onGetDate(selectedDate, event.target.label)
  }
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => {
    console.log(ref)
    return (
    <Box className={classes.customInput} >
      <Box >
        <TextField value={value} label={label} className={classes.inputDate} />
      </Box>
      <Box className={classes.calendarIcon}>
       <TodayIcon fontSize="large" onClick={onClick} ref={ref} style={{fontSize: '27px'}} />
      </Box>
    </Box>
  )}
  );

  return (
    <DatePicker
      locale='vi'
      dateFormat='dd/MM/yyyy'
      customInput={<CustomInput />}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={selectedDate}
      onSelect={(event) =>handleDateSelect(selectedDate,event)}
      onChange={(date) => setSelectedDate(date)}
    />
  );
}
const useStyle = makeStyles(() => ({
  customInput: {
    display: 'flex',
    alignItems: 'end'
  },
  inputDate: {
    fontSize: '16px'
  },
  calendarIcon: {
    position: 'absolute',
    zIndex: 999,
    left: '250px',
  }
}));