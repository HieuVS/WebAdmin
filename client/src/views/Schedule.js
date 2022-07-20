import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useRef } from "react";
import { Box, Grid, Typography, Paper, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { getTable } from "../api/tableApi";
import formatDate from '../utils/formatDate';
import AddTableDialog from "../Components/layout/Table/AddTableDialog";
import DeleteTableDialog from "../Components/layout/Table/DeleteTableDialog";
import AddScheduleDialog from "../Components/layout/Table/AddScheduleDialog";
import logo from '../assets/image/logo.png';
import store from "../redux/store";

function Schedule() {
  const classes = useStyle();
  const ref = useRef();
  useEffect(() => {
    getTable();
  }, []);
  const tableList = useSelector((state) => state.table);
  //console.log('Re=Render Schedule');
  const [openDelete, setOpenDelete] = useState({});
  const [openCreateTable, setOpenCreateTable] = useState(false);
  const [openAddSchedule, setOpenAddSchedule] = useState(false);
  const [type, setType] = useState('Inactive');
  const [tableId, setTableId] = useState('');

  const getTableType = () => {
    if(tableList.tables) {
      const tableType = ( type === 'Active' ) ? tableList.tables.filter(item => item.isActive === true) : tableList.tables.filter(item => item.isActive === false)
      return tableType;
    }
    else return [];
  }  

  const filteredTable = getTableType();
  const scheduleList = useSelector(state => state.schedule);

  const onOpenAddSchedule = (item) => {
    ref.current?.open(item._id);
    setTableId(item._id)
    //setOpenAddSchedule({[item._id]: true});
    if(!scheduleList.schedule.some(schedule=> schedule.table._id === item._id)) {
    //if(!scheduleList.schedule.hasOwnProperty(item._id)) {
      console.log("DISPATCH");
      store.dispatch({type: `SET_DATA_SCHEDULE`, payload: { table: item}, id: item._id} )
    }
  }

  return (
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
                <Paper className={classes.paperItem} onClick={()=>onOpenAddSchedule(item)}>
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
                    <Typography variant="h5" className={classes.itemTitle}>Bàn số:</Typography>
                    <Typography variant="h3" className={classes.numberTable}>{item.number}</Typography>
                  </Box>
                  <Box className={classes.contentDiscount}>
                    <Typography variant="h5" className={classes.itemTitle}>Giờ đặt: {formatDate(item.startAt)}</Typography>
                  </Box>
                  <Box className={classes.contentDiscount}>
                    <Typography variant="h5" className={classes.itemTitle}>Số người: {item.headCount}</Typography>
                  </Box>
                  <Box className={classes.deleteDiscount}>
                    <IconButton  onClick={()=>setOpenDelete({[item._id]: true})}>
                      <DeleteIcon  fontSize="medium" />
                    </IconButton>
                  </Box>
                  <DeleteTableDialog open={openDelete[item._id] ? true: false} tableId={item._id} onClose={()=>setOpenDelete({[item._id]: false})}/>
                </Paper>
              </Grid>            
          );
        }) : (<Typography style={{padding: '10px 20px'}} variant="h4">Hiện chưa có bàn nào.</Typography>)
      }
        <AddScheduleDialog ref={ref} tableId={tableId} />
      </Grid>
    </Paper>
  );
}

const useStyle = makeStyles(() => ({
  paperContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "95%",
    minHeight: "120vh",
    //maxHeight:'85vh'
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
    '&:hover': {
        cursor: 'pointer',
        //backgroundImage: `url(${logo})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(${logo})`
    }
  },
  itemTitle: {
    color: '#008080'
  },
  boxAddDiscount: {
    float: 'right'
  },
  tableNumber: {
    marginTop: '10px',
    display: 'flex', 
    alignItems: 'center'
  },
  numberTable: {
    fontFamily: 'Bahnschrift SemiBold',
    marginLeft: '8px'
  },
  contentDiscount: {
    //marginTop: '10px'
  },
  deleteDiscount: {
    position: 'absolute',
    top: '3px',
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

export default Schedule;
