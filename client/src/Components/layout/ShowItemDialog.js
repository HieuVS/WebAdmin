import { Box, Dialog, DialogTitle, List, ListItem, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

function ShowItemDialog(props) {
  const { open, onClose, items } = props;
  const classes = useStyle();
  //const itemList = useSelector((state) => state.order);
  //console.log("items la: ",items);
  return (
    <Dialog open={open} onClose={onClose}>
      
      <DialogTitle>Danh sách sản phẩm</DialogTitle>
      <Box className={classes.boxShowItem}>
        <List>
          {items.map((item,index) => (
            <ListItem key={index}>
              <Grid container>
                <Grid item lg={4}>{item.name}</Grid>
                <Grid item lg={2}>{item.quantity}</Grid>
              </Grid>
            </ListItem>
          ))}
          
        </List>
      </Box>
    </Dialog>
  );
}

const useStyle = makeStyles(() => ({
  boxShowItem: {
    padding: '16px'
  },
}));
export default ShowItemDialog;
