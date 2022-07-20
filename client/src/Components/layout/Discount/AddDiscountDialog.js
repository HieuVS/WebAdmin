import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { Box, Typography, Paper, Dialog, TextField, Button } from "@material-ui/core";
import { createDiscount } from "../../../api/discountApi";

export default function AddDiscountDialog({ open, onClose }) {
  const classes = useStyle();
  const [discountForm, setDiscountForm] = useState({
      code: '',
      discountCent: Number
  })
  const { code, discountCent } = discountForm;

  const onChangeDiscountForm = (event) => {
    setDiscountForm({...discountForm, [event.target.name]: event.target.value})
  }
  console.log('discountForm: ',discountForm);

  const onAddDiscount = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await createDiscount(discountForm);
      if(!success) console.log('Error: ', message)
      else {
        setDiscountForm({
          code: '',
          discountCent: Number
        })
      console.log('add successfully')
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{ className: classes.pickItemPaper }}
    >
      <Paper className={classes.paperItem}>
        <form onSubmit={onAddDiscount}>
          <Box className="">
            <Typography variant="h5" className={classes.itemTitle}>
              Thêm mã khuyến mại mới
            </Typography>
          </Box>
          <Box className={classes.contentDiscount}>
            <Box className={classes.boxContent}>
              <Typography variant="h5" className={classes.itemTitle}>
                Tên mã:
              </Typography>
              <TextField value={code} name="code" onChange={onChangeDiscountForm}/>
            </Box>
            <Box className={classes.boxContent}>
              <Typography variant="h5" className={classes.itemTitle}>
                Phần trăm giảm:
              </Typography>
              <TextField type="number" value={discountCent} name="discountCent" onChange={onChangeDiscountForm}/>
            </Box>
          </Box>
          <Box className={classes.boxSubmit}>
            <Button type="submit" variant="contained" className={classes.btnSubmit}>Tạo khuyến mại</Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  );
}
const useStyle = makeStyles(() => ({
  pickItemPaper: {
    display: "block",
    width: "50%",
    padding: '20px'
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
    border: "3px solid #EF5845",
    borderRadius: "6px",
    boxShadow: "7px 7px 1px -1px rgb(0 0 0 / 20%)",
    padding: "20px",
    "&:hover": {
      color: "#EF5845",
    },
  },
  itemTitle: {
    color: "#008080",
    lineHeight: 'normal'
  },
  contentDiscount: {
    marginTop: "25px",
  },
  deleteDiscount: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  boxContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    alignItems: 'flex-end'
  },
  boxSubmit: {
    display: 'flex',
    justifyContent: 'center'
  },
  btnSubmit: {
    backgroundColor: '#20B2AA',
    borderRadius: '6px',
    marginTop: '20px',
    '&:hover': {
        backgroundColor: "#EF5845"
    }
  }
}));
