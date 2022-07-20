import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, IconButton
} from "@material-ui/core";
import { getDiscount } from "../api/discountApi";
import { useSelector } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDiscountDialog from "../Components/layout/Discount/DeleteDiscountDialog";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddDiscountDialog from "../Components/layout/Discount/AddDiscountDialog";

function Discount() {
  const classes = useStyle();

  useEffect(() => {
    getDiscount();
  }, []);
  const discountList = useSelector((state) => state.discount);

  const [openDelete, setOpenDelete] = useState({});
  const [openAddDiscount, setOpenAddDiscount] = useState(false);

  console.log("discountList", discountList);

  return (
    <Paper className={classes.paperContainer}>
      <Box className={classes.categoryHeader}>
        <Typography variant="h4">Quản lý mã khuyến mại</Typography>
      </Box>
      <Box className={classes.boxAddDiscount}>
        <IconButton className={classes.btnAddDiscount} onClick={() => setOpenAddDiscount(true)}>
          <AddCircleIcon fontSize="large"/>
        </IconButton>
        <AddDiscountDialog open={openAddDiscount} onClose={()=>setOpenAddDiscount(false)}/>
      </Box>
      <Grid container className={classes.containerDiscount} spacing={3}>
        {discountList.discounts.map((item) => {
          return (
              <Grid key={item._id} item md={4} lg={4} className={classes.itemDiscount}>
                <Paper className={classes.paperItem}>
                  <Box className="">
                    <Typography variant="h5" className={classes.itemTitle}>{item.code}</Typography>
                  </Box>
                  <Box className={classes.contentDiscount}>
                    <Typography variant="h5" className={classes.itemTitle}>Số phần trăm giảm: {item.discount*100}%</Typography>
                  </Box>
                  <IconButton className={classes.deleteDiscount} onClick={()=>setOpenDelete({[item._id]: true})}>
                    <DeleteIcon  fontSize="medium" />
                  </IconButton>
                  <DeleteDiscountDialog open={openDelete[item._id] ? true: false} discountId={item._id} onClose={()=>setOpenDelete({[item._id]: false})}/>
                </Paper>
              </Grid>            
          );
        })}
      </Grid>
    </Paper>
  );
}

const useStyle = makeStyles(() => ({
  paperContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "90%",
    minHeight: "88vh",
    //maxHeight:'85vh'
  },
  categoryHeader: {
    paddingTop: '10px',
    margin: '0 20px 0 20px'
  },
  containerDiscount: {
    width: '100%',
    height: '65vh',
    margin: 0
  },
  itemDiscount: {
    maxHeight: '240px'
  },
  paperItem: {
    position: 'relative',
    border: '3px solid #EF5845',
    borderRadius: '6px',
    boxShadow: '7px 7px 1px -1px rgb(0 0 0 / 20%)',
    height: '160px',
    padding: '20px',
    '&:hover': {
        color: '#EF5845'
    }
  },
  itemTitle: {
    color: '#008080'
  },
  boxAddDiscount: {
    float: 'right'
  },
  btnAddDiscount: {
    //fontSize: '30px'
  },
  contentDiscount: {
    marginTop: '25px'
  },
  deleteDiscount: {
    position: 'absolute',
    top: '10px',
    right: '10px'
  }
}));

export default Discount;
