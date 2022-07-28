import { Box, Grid, List, ListItem, Typography, IconButton, Button, Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getType } from "../api/categoryApi";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCategoryTypeDialog from "../Components/layout/Category/AddCategoryTypeDialog";
import DeleteCategoryTypeDialog from "../Components/layout/Category/DeleteCategoryTypeDialog";
import ItemListDialog from "../Components/layout/Category/ItemListDialog";
import AddItemDialog from "../Components/layout/Category/AddItemDialog";
import { getItem } from "../api/itemApi";
import restaurant from '../assets/image/restaurant.jpg';
import meal from '../assets/image/Meal.png';

function Item() {
  const classes = useStyle();

  useEffect(()=> {
    getType();
    getItem();
  },[])

  const category = useSelector((state)=> state.category);
  const { types: type } = category;
  const [openAddType, setOpenAddType] = useState(false);
  const [openDelete, setOpenDelete] = useState({});
  const [openItemList, setOpenItemList] =useState({});
  const [openAddItem, setOpenAddItem] = useState(false);
  
  // const appetizer = list ? list.filter((items)=> items.category==="62d101d59bec899dad2a626a") : [];
  // const mainCourse = list ? list.filter((items)=> items.category==="62d101c59bec899dad2a6269") : [];
  // const dessert = list ? list.filter((items)=> items.category==="62d101e09bec899dad2a626b") : [];
  // const drinkItem = list ? list.filter((items)=> items.category==="62d101ed9bec899dad2a626c") : [];

  const onOpenDelete = (id) => {
    setOpenDelete({[id]: true});
  }

  const onOpenItemList = (id) => {
    setOpenItemList({[id]: true})
  }

  return (
    <Box className={classes.boxContainer}>
      <Paper className={classes.categoryContainer}>
        <Box className={classes.boxImageContainer}>
        </Box>
        <Box style={{zIndex: 10}}>
          <Box className={classes.categoryHeader}>
            <Typography variant="h3" className={classes.fontHeader}>Quản lý danh mục sản phẩm</Typography>
          </Box>
          <Box>
            <Typography variant="h5" className={classes.fontTitle}>Danh mục sản phẩm hiện có</Typography>
          </Box>
          <List className={classes.categoryList}>
            {type ? type.map((item, index)=> (
              <Paper className={classes.itemContainer} key={index}>
                <ListItem button onClick={()=>onOpenItemList(item._id)}  className={classes.itemCategory}>
                  <Typography variant="h5" className={classes.fontTitle}>{item.type}</Typography>
                </ListItem>
                <ItemListDialog open={openItemList[item._id] ? true: false} dishesId={item._id} title={item.type} type={type} onClose={()=>setOpenItemList({[item._id]: false})}/>
                <IconButton  onClick={()=>onOpenDelete(item._id)}>
                  <DeleteIcon  fontSize="medium" />
                </IconButton>
                <DeleteCategoryTypeDialog open={openDelete[item._id] ? true: false} typeId={item._id} onClose={()=>setOpenDelete({[item._id]: false})}/>
              </Paper>
              
            )): ''}
          </List>
          <Box className={classes.btnGroup}>
            <Button variant='outlined' onClick={()=>setOpenAddType(true)} className={classes.btnAddCategory}>Thêm danh mục sản phẩm</Button>
            <Button variant='outlined' onClick={()=>setOpenAddItem(true)} className={classes.btnAddCategory}>Thêm sản phẩm mới</Button>
          </Box>

        </Box>
        <AddCategoryTypeDialog open={openAddType} onClose={()=>setOpenAddType(false)}/>
        <AddItemDialog open={openAddItem} type={type} onClose={()=>setOpenAddItem(false)}/>
      </Paper>
    </Box>
  );
}

const useStyle = makeStyles(() => ({
  boxContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(${restaurant})`,
    position: 'relative'
  },
  categoryContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "80%",
    minHeight: "70vh",
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
    //backgroundColor: 'antiquewhite',
  },
  boxImageContainer: {
    backgroundImage:`url(${meal})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width:'80%',
    height: '80%',
    position: 'absolute',
    zIndex: 2
  },
  categoryHeader: {
    marginBottom: "20px",
  },
  fontHeader: {
    fontWeight: '700',
  },
  fontTitle: {
    fontWeight: '600',
  },
  categoryList: {
    minWidth: '52%'
  },
  itemContainer: {
    display: 'flex'
  },
  itemCategory: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  btnGroup: {
    //width: '48%',
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  btnAddCategory: {
    fontWeight: 600,
    backgroundColor: '#EF5845',
    '&:hover': {
      backgroundColor: '#fff',
    }
  },
}));
export default Item;
