import {  Dialog, DialogTitle, Typography, Box, Grid, Avatar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItem } from "../../api/itemApi";

function PickItemDialog(props) {
  const { open, onClose } = props;
  const classes = useStyle();
  useEffect(() => {
    getItem();
  },[])

  const itemList = useSelector((state) => state.item);
  const { items: list } = itemList;
  const drinkItem = list.filter((items)=> items.category==="624dbee9a67c7183b8cc0bfa");
  console.log('list: ',drinkItem);
  return (
    <Dialog open={open} onClose={onClose} className={classes.pickItemDialog} maxWidth={false} PaperProps={{className: classes.pickItemPaper}}>
      <DialogTitle>Chọn sản phẩm bạn muốn</DialogTitle>
      <Box >
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Khai vị</Typography>
          </Box>
          <Grid container>
            <Grid style={{backgroundColor:'red', height: '30px'}} item lg={4}></Grid>
            
          </Grid> 
        </Box>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Món chính</Typography>
          </Box>
          <Box>
            
          </Box>
        </Box>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Tráng miệng</Typography>
          </Box>
          <Box>
            
          </Box>
        </Box>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Thức uống</Typography>
          </Box>
          <Box>
          <Grid container style={{display: 'block'}}>
            {
            drinkItem.map(item => (
              <>
                <Grid style={{backgroundColor:'red', height: '30px'}} item lg={4} md={4} xs={4}>{item.name}</Grid>                     
                <Grid style={{backgroundColor:'red', height: '30px'}} item lg={4}>
                  <Avatar src={item.img}></Avatar>
                </Grid>                     
              </>
            ))
            }
                {/* <Grid style={{backgroundColor:'red', height: '30px'}} item lg={4} md={4} xs={4}>Hello</Grid>                     
                <Grid style={{backgroundColor:'green', height: '30px'}} item lg={4} md={4} xs={4}>Nam</Grid>                     
                <Grid style={{backgroundColor:'red', height: '30px'}} item lg={4} md={4} xs={4}></Grid>                      */}
            
          </Grid> 
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Dialog>
  );
}

const useStyle = makeStyles(() => ({
  pickItemPaper: {
    display:'block',
    width: '80%',
    height: '880px',
  },
  mealContainer: {
    minHeight: '320px'
  },
  mealTitle: {
    display:'flex',
    justifyContent: 'center',
    width: '100%'
  },
  boxItem: {
    //display: 'block'
  }
}));
export default PickItemDialog;
