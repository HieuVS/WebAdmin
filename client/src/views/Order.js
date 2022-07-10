import { Box, Button, Grid, IconButton, InputAdornment, List, ListItem, OutlinedInput, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrder } from "../api/orderApi";
import SearchIcon from "@material-ui/icons/Search";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import formatDate from '../utils/formatDate'
import ConfirmDialog from "../Components/layout/ConfirmDialog";
import ShowItemDialog from "../Components/layout/ShowItemDialog";
import AddOrderDialog from "../Components/layout/AddOrderDialog";
import UpdateOrderDialog from "../Components/layout/UpdateOrderDialog";


function Order() {
  useEffect(() => {
    console.log("hello")
    getOrder();
  }, []);
  const orderList = useSelector((state) => state.order);
  const { order: orders } = orderList;
  
  const [openDelete, setOpenDelete] = useState({});
  const [openDetail, setOpenDetail] = useState({});
  const [item, setItem] = useState(null);
  const [openAddOrder, setOpenAddOrder] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [openUpdate, setOpenUpdate] = useState({});
  
  var listSearchItem = orders.filter((item) => 
    item.customerName.toUpperCase().includes(searchItem.toUpperCase())
  );

  const onOpenDelete = (id) => {
    setOpenDelete({[id]: true});
  }
  
  const onOpenOrderItem = (id, item) => {
    setOpenDetail({[id]: true});
    console.log("open: ",openDetail)
    setItem(item)
  }

  const onCloseDialogItem = (id) => {
    setOpenDetail({[id]: false})
  }
  
  const onSearchItem = (event) => {
    setSearchItem(event.target.value);
  }
  
  const classes = useStyle();
  return (
    <Box className={classes.orderContainer}>
      <Box className={classes.orderHeader}>
        <Typography variant="h3">Danh sách đơn hàng đợi mang đi</Typography>
      </Box>
      <Box className={classes.toolBox}>
        <Grid container>
          <Grid item lg={11}>
            <OutlinedInput className={classes.orderSearch}
              fullWidth={true}
              inputProps={{className: classes.inputSearch}}
              startAdornment= {
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={onSearchItem}
              value={searchItem}
            />
          </Grid>
          <Grid item lg={1} className={classes.addGrid}>
            <IconButton className={classes.btnAddOrder} onClick={() => setOpenAddOrder(true)}>
              <AddToPhotosIcon fontSize="large"/>
            </IconButton>
            <AddOrderDialog open={openAddOrder} onClose={()=> setOpenAddOrder(false)}/>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.orderTable}>
        <Table className={classes.Table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Tên Khách hàng</TableCell>
              <TableCell align="left">SĐT</TableCell>
              <TableCell align="left">Địa chỉ</TableCell>
              <TableCell align="left">Danh sách sản phẩm</TableCell>
              <TableCell align="left">Thời gian</TableCell>
              <TableCell align="left">Loại</TableCell>
              <TableCell align="left">Tuỳ Chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!searchItem ? orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell align="left">{order._id}</TableCell>
                <TableCell align="left">{order.customerName}</TableCell>
                <TableCell align="left">{order.phone}</TableCell>
                <TableCell align="left">{order.address}</TableCell>
                <TableCell align="left">
                  <Button className={classes.btnShowItem} id={order._id} onClick={() => onOpenOrderItem(order._id, order.items)}>
                    {order.items[0].name}
                  </Button>
                  {item ? <ShowItemDialog open={openDetail[order._id] ? true: false} onClose={()=>onCloseDialogItem(order._id)} items={item}/> : ''}                 
                </TableCell>
                {/* <TableCell align="left">{order.items.map((item) => 
                  (<List>
                    <ListItem>{item.name}</ListItem>
                  </List>))}
                </TableCell> */}
                <TableCell align="left">{formatDate(order.createAt)}</TableCell>
                <TableCell align="left">
                  {order.isTakeAway ? "take away" : "table"}
                </TableCell>
                <TableCell align="left" className={classes.btnOption}>
                  <IconButton onClick={()=>setOpenUpdate({[order._id]: true})}>
                    <BuildIcon fontSize="medium" />
                  </IconButton>
                  <UpdateOrderDialog open={openUpdate[order._id] ? true : false} order={order} onClose={()=>setOpenUpdate({[order._id]: false})}/>
                  <IconButton  onClick={()=>onOpenDelete(order._id)}>
                    <DeleteIcon  fontSize="medium" />
                  </IconButton>
                  <ConfirmDialog open={openDelete[order._id] ? true : false} orderId={order._id} onClose={()=>setOpenDelete({[order._id]: false})} />
                </TableCell>
              </TableRow>
            )) 
            : 
            (
              listSearchItem.map((order) => (
                <TableRow key={order._id}>
                <TableCell align="left">{order._id}</TableCell>
                <TableCell align="left">{order.customerName}</TableCell>
                <TableCell align="left">{order.phone}</TableCell>
                <TableCell align="left">{order.address}</TableCell>
                <TableCell align="left">
                  <Button id={order._id} onClick={() => onOpenOrderItem(order._id, order.items)}>
                    {order.items[0].name}
                  </Button>
                  {item ? <ShowItemDialog open={openDetail[order._id] ? true: false} onClose={()=>onCloseDialogItem(order._id)} items={item}/> : ''}                 
                </TableCell>
                <TableCell align="left">{formatDate(order.createAt)}</TableCell>
                <TableCell align="left">
                  {order.isTakeAway ? "take away" : "table"}
                </TableCell>
                <TableCell align="left" className={classes.btnOption}>
                  <IconButton >
                    <BuildIcon fontSize="medium" />
                  </IconButton>
                  <IconButton  onClick={()=>onOpenDelete(order._id)}>
                    <DeleteIcon  fontSize="medium" />
                  </IconButton>
                  <ConfirmDialog open={openDelete[order._id] ? true : false} onClose={()=>setOpenDelete({[order._id]: false})} />
                </TableCell>
              </TableRow>
              ))
            )
            
            // .map(order => (
            //   console.log(order)
            // ))
            // listSearchItem.map((order) => (
            //   <TableRow key={order._id}>

            //   </TableRow>
            // ))
            // })
          }
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

const useStyle = makeStyles(() => ({
  orderContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "80%",
    minHeight: "88vh",
    //maxHeight:'85vh'
  },
  orderHeader: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  toolBox: {
    height: "60px",
  },
  orderSearch: {

  },
  inputSearch: {

  },
  addGrid: {
    display: 'flex',
    justifyContent: 'end',
  },
  btnAddOrder: {
    maxWidth: '60px',
  },
  orderTable: {
    marginTop: "10px",
  },
  btnOption: {
    display: 'flex'
  },
  btnShowItem: {
    textAlign: 'left'
  }
}));
export default Order;
