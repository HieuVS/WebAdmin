import {  Dialog, DialogTitle, Typography, Box, Grid, Avatar, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import { memo } from 'react';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';

function ItemListDialog(props) {
  const { open, onClose, dishesId, title } = props;
  const classes = useStyle();
  
  const itemList = useSelector((state) => state.item);
  const { items: list } = itemList;
  //console.log("List item: ",list);
  const dish = list ? list.filter((items)=> items.category===dishesId) : [];
  
  console.log('dishesId:', list)


  return (
    <Dialog open={open} className={classes.pickItemDialog} maxWidth={false} PaperProps={{className: classes.pickItemPaper}}>
      <IconButton className={classes.btnClose} onClick={onClose}>
        <CancelIcon className={classes.iconClose}/>
      </IconButton> 
      <DialogTitle>Danh sách sản phẩm</DialogTitle>
      <Box style={{paddingLeft :'40px', paddingRight: '40px'}}>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">{title}</Typography>
          </Box>
          <Grid container>
          {
            dish.map(item => {
              const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, ''));
              console.log("Re-render");
              return (
                <Grid key={item._id} className={classes.gridImg} item lg={3} sm={3} md={3}>
                  <Avatar variant="square" src={`data:image/png;base64,${base64String}`}  className={classes.imgItem}/>
                  <Box className={classes.itemInfo}>
                    <Typography className={classes.itemName} variant='h5'>{item.name}</Typography>
                    <Box className={classes.addItemBox}>
                      <Typography className={classes.itemPrice} variant='h6'>{item.price}</Typography>
                      <Box className={classes.itemBtnAdd} id="toolBox" onClick={()=>{}}>
                        <IconButton className={classes.btnTool}>
                          <BuildIcon  fontSize="small" />
                        </IconButton>
                        <IconButton className={classes.btnTool}>
                          <DeleteIcon  fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            })
            }            
          </Grid> 
        </Box>      
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
  },
  gridImg: {
    padding: '30px',
    minHeight: '280px',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover #toolBox': {
      '-webkit-transform': 'translateY(-25px)',
      '-moz-transform': 'translateY(-25px)',
      '-ms-transform': 'translateY(-25px)',
      '-o-transform': 'translateY(-25px)',
      opacity: 1,
      },
      '&:hover h6': {
      '-webkit-transform': 'translateY(-25px)',
      '-moz-transform': 'translateY(-25px)',
      '-ms-transform': 'translateY(-25px)',
      '-o-transform': 'translateY(-25px)',
      opacity: 0,
      },
  },
  imgItem: {
    width: '100%',
    height: '90%',
    margin: 'auto'
  },
  itemName: {
    textAlign: 'center',
    zIndex: 100,
    backgroundColor: 'fff'
  },
  itemPrice: {
    position: 'absolute',
    textAlign: 'center',
    zIndex: 9,
    //top: '20px',
    transition: 'all .2s cubic-bezier(0.34, -0.35, 1, 0.97)'
  },
  itemInfo: {
    marginTop: '10px',
  },
  itemBtnAdd: {
    height: '30px',
    position: 'absolute',
    opacity: 0,
    zIndex: 9,
    top: '25px',
    transition: 'all .3s ease-in-out',
    display:'flex',
    width: '36%',
    justifyContent: 'space-around'
  },
  addItemBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 9,
    textAlign: 'center',
  },
  btnTool: {
    padding: '4px',
    '&:hover': {
        color: '#EF5845'
    }
  }
}));

const memoItemListDialog = memo(ItemListDialog, (props, nextProps) => {
  //if(nextProps.open === props.open) return true;
  return props.open === nextProps.open;
})

export default memoItemListDialog;
