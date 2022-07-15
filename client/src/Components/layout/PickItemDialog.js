import {  Dialog, DialogTitle, Typography, Box, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItem } from "../../api/itemApi";
import { memo } from 'react';

function PickItemDialog(props) {
  const { open, onClose, ...others } = props;
  const classes = useStyle();
  useEffect(() => {
    getItem();
  },[])

  useEffect(() => {
    setItemPicked(props.itemList)
  },[open])

  const itemList = useSelector((state) => state.item);
  const { items: list } = itemList;
  //console.log("List item: ",list);
  const appetizer = list ? list.filter((items)=> items.category==="62d101d59bec899dad2a626a") : [];
  const mainCourse = list ? list.filter((items)=> items.category==="62d101c59bec899dad2a6269") : [];
  const dessert = list ? list.filter((items)=> items.category==="62d101e09bec899dad2a626b") : [];
  const drinkItem = list ? list.filter((items)=> items.category==="62d101ed9bec899dad2a626c") : [];
  const [itemPicked, setItemPicked] = useState([]);
  //console.log('onGetItem: ', itemPicked);

  const handlePickItem = (item) => {
    let checkExisted = itemPicked.findIndex(element => element.name.includes(item))
    if(checkExisted===-1) {
      setItemPicked([...itemPicked, {name : item, quantity: 1}]);
      props.onGetItem([...itemPicked, {name : item, quantity: 1}]);
    }
    else {
      const newItem = itemPicked.map(element => {
        if(element.name===item) return {...element,  quantity: element.quantity +1 }
          return element;
      })
      setItemPicked(newItem);
      props.onGetItem(newItem);
      // itemPicked[checkExisted].quantity +=1;
      // setItemPicked([...itemPicked]);
    }

  }

  return (
    <Dialog open={open} onClose={onClose} className={classes.pickItemDialog} maxWidth={false} PaperProps={{className: classes.pickItemPaper}}>
      <DialogTitle>Chọn sản phẩm bạn muốn</DialogTitle>
      <Box style={{paddingLeft :'40px', paddingRight: '40px'}}>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Khai vị</Typography>
          </Box>
          <Grid container>
          {
            appetizer.map(item => {
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
                      <Typography className={classes.itemBtnAdd} variant='button' onClick={()=>{handlePickItem(item.name)}}>Thêm vào giỏ hàng</Typography>
                    </Box>
                  </Box>
                </Grid>
              )
            })
            }            
          </Grid> 
        </Box>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Món chính</Typography>
          </Box>
          <Grid container>
          {
            mainCourse.map(item => {
              const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, ''));              
              return (
              // <Box key={item._id}>
                <Grid key={item._id} className={classes.gridImg} item lg={3} sm={3} md={3}>
                  <Avatar variant="square" src={`data:image/png;base64,${base64String}`}  className={classes.imgItem}/>
                  <Box>
                    <Typography className={classes.itemName} variant='h6'>{item.name}</Typography>
                  </Box>
                </Grid>                     
               
              // </Box>
              )
            })
            }            
          </Grid> 
        </Box>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Tráng miệng</Typography>
          </Box>
          <Grid container>
          {
            dessert.map(item => {
              const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, ''));              
              return (
              // <Box key={item._id}>
                <Grid key={item._id} className={classes.gridImg} item lg={3} sm={3} md={3}>
                  <Avatar variant="square" src={`data:image/png;base64,${base64String}`}  className={classes.imgItem}/>
                  <Box>
                    <Typography className={classes.itemName} variant='h6'>{item.name}</Typography>
                  </Box>
                </Grid>                     
               
              // </Box>
              )
            })
            }            
          </Grid> 
        </Box>
        <Box className={classes.mealContainer}>
          <Box className={classes.mealTitle}>
            <Typography  variant="h4">Thức uống</Typography>
          </Box>
          <Box>
          <Grid container >
            {
            drinkItem.map(item => {
              const base64String = btoa(new Uint8Array(item.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, ''));              
              return (
              // <Box key={item._id}>
                <Grid key={item._id} className={classes.gridImg} item lg={3} sm={3} md={3}>
                  <Avatar variant="square" src={`data:image/png;base64,${base64String}`}  className={classes.imgItem}/>
                  <Box>
                    <Typography className={classes.itemName} variant='h6'>{item.name}</Typography>
                  </Box>
                </Grid>                     
               
              // </Box>
              )
            })
            }
            
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
  },
  gridImg: {
    padding: '30px',
    minHeight: '280px',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover .MuiTypography-button': {
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
    color: '#EF5845',
    letterSpacing: '0.8px',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: '18px',
    fontFamily: 'Inter,Roboto,Arial,sans-serif',
  },
  addItemBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 9,
    textAlign: 'center',

  }
}));

const memoPickItemDialog = memo(PickItemDialog, (props, nextProps) => {
  //if(nextProps.open === props.open) return true;
  return props.open === nextProps.open;
})

export default memoPickItemDialog;
