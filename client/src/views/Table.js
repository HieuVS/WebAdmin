import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, IconButton, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { getTable } from "../api/tableApi";
import formatDate from '../utils/formatDate';
import AddTableDialog from "../Components/layout/Table/AddTableDialog";
import BuildIcon from '@material-ui/icons/Build';
import DeleteTableDialog from "../Components/layout/Table/DeleteTableDialog";
import UpdateTableDialog from "../Components/layout/Table/UpdateTableDialog";
import restaurant from '../assets/image/restaurant.jpg'

function Table() {
  const classes = useStyle();

  useEffect(() => {
    getTable();
  }, []);
  const tableList = useSelector((state) => state.table);
  //console.log("tableList: ", tableList);

  const [openDelete, setOpenDelete] = useState({});
  const [openUpdateTable, setOpenUpdateTable] = useState({})
  const [openCreateTable, setOpenCreateTable] = useState(false);
  const [type, setType] = useState('Inactive');

  const getTableType = () => {
    if(tableList.tables) {
      const tableType = ( type === 'Active' ) ? tableList.tables.filter(item => item.isActive === true) : tableList.tables.filter(item => item.isActive === false)
      return tableType;
    }
    else return [];
  }  

  const filteredTable = getTableType();
  
  return (
    <Box className={classes.boxContainer}>
    <Paper className={classes.paperContainer}>
      <Box className={classes.categoryHeader}>
        <Typography variant="h4">Quản lý đặt bàn</Typography>
      </Box>
      <Box className={classes.title}>
        <Typography variant="h5">Danh sách bàn</Typography>
      </Box>
      <Box className={classes.boxBtn}>
        <Box>
          <IconButton className={classes.btnActive} style={type === 'Inactive' ? {backgroundColor: '#EF5845', color:'#000'} : {}} onClick={()=>setType('Inactive')}>
            <FiberManualRecordIcon className={classes.iconDeactive}/>
            <Typography>Bàn trống</Typography>
          </IconButton>
          <IconButton className={classes.btnActive} style={type === 'Active' ? {backgroundColor: '#EF5845', color:'#000'} : {}} onClick={()=>setType('Active')}>
            <FiberManualRecordIcon className={classes.iconActive}/>
            <Typography>Bàn đã đặt</Typography>
          </IconButton>
        </Box>
        <Box className={classes.boxAddDiscount}>
          <IconButton className={classes.btnAddDiscount} onClick={() => setOpenCreateTable(true)}>
            <AddCircleIcon fontSize="large"/>
          </IconButton>
          <AddTableDialog open={openCreateTable} onClose={()=>setOpenCreateTable(false)}/>
        </Box>
      </Box>
      <Grid container className={classes.containerDiscount} spacing={3}>
        {filteredTable.length !== 0 ? getTableType().map((item) => {
          return (
              <Grid key={item._id} item md={4} lg={4} className={classes.itemDiscount}>
                <Paper className={classes.paperItem}>
                  {type === 'Active' ? (
                    <Box className={classes.boxStatus}>
                      <FiberManualRecordIcon className={classes.iconActive}/>
                      <Typography>Active</Typography>
                    </Box>) :
                  (
                    <Box className={classes.boxStatus}>
                    <FiberManualRecordIcon className={classes.iconDeactive}/>
                    <Typography>Inactive</Typography>
                  </Box>
                  )}
                  
                  <Box className={classes.tableNumber}>
                    <Typography variant="h5" className={classes.itemTitle}>Bàn số: {item.number}</Typography>
                  </Box>
                  <Box className={classes.contentDiscount}>
                    <Typography variant="h5" className={classes.itemTitle}>Giờ đặt: {formatDate(item.startAt)}</Typography>
                  </Box>
                  <Box className={classes.contentDiscount}>
                    <Typography variant="h5" className={classes.itemTitle}>Số người: {item.headCount}</Typography>
                  </Box>
                  <Box className={classes.deleteDiscount}>
                    <IconButton onClick={()=>setOpenUpdateTable({[item._id]:true})}  className={classes.btnTool}>
                      <BuildIcon  fontSize="medium" />
                    </IconButton>
                    <IconButton  onClick={()=>setOpenDelete({[item._id]: true})}>
                      <DeleteIcon  fontSize="medium" />
                    </IconButton>
                  </Box>
                  <DeleteTableDialog open={openDelete[item._id] ? true: false} tableId={item._id} onClose={()=>setOpenDelete({[item._id]: false})}/>
                  <UpdateTableDialog open={openUpdateTable[item._id] ? true: false} onClose={()=>setOpenUpdateTable({[item._id]: false})} item={item} />
                </Paper>
              </Grid>            
          );
        }) : (<Typography style={{padding: '10px 20px'}} variant="h4">Hiện chưa có bàn nào.</Typography>)
      }
      </Grid>
    </Paper>

    </Box>
  );
}

const useStyle = makeStyles(() => ({
  boxContainer: {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(${restaurant})`
  },
  paperContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "90%",
    minHeight: "120vh",
    //maxHeight:'85vh'
    //backgroundImage: `url(${restaurant})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // zIndex: -1
  },
  categoryHeader: {
    paddingTop: '10px',
    margin: '0 20px 0 20px'
  },
  containerDiscount: {
    width: '100%',
    //height: '65vh',
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
    // '&:hover': {
    //     color: '#EF5845'
    // }
  },
  itemTitle: {
    color: '#008080'
  },
  boxAddDiscount: {
    float: 'right'
  },
  tableNumber: {
    marginTop: '10px'
  },
  contentDiscount: {
    //marginTop: '10px'
  },
  deleteDiscount: {
    position: 'absolute',
    top: '7px',
    right: '1px'
  },
  title: {
    margin: '20px'
  },
  boxBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px'
  },
  btnActive: {
    border: '3px solid #EF5845',
    borderRadius: '6px',
    boxShadow: '5px 5px 1px -1px rgb(0 0 0 / 20%)',
    marginRight: '8px',

  },
  iconActive: {
    fontSize: '15px',
    marginRight: '2px',
    color: '#31a24c'
  },
  iconDeactive: {
    fontSize: '15px',
    marginRight: '2px',
    color: '#0000008a'
  },
  boxStatus: {
    display: 'flex'
  }
}));

export default Table;
