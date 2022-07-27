import { Box, Grid, IconButton, InputAdornment, OutlinedInput, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStaff } from "../api/staffApi";
import SearchIcon from "@material-ui/icons/Search";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import { formatDatePicker } from '../utils/formatDate'
import DeleteStaffDialog from '../Components/layout/Staff/DeleteStaffDialog';
import AddStaffDialog from "../Components/layout/Staff/AddStaffDialog";
import UpdateStaffDialog from "../Components/layout/Staff/UpdateStaffDialog";

function Staff() {
  useEffect(() => {
    console.log("hello")
    getStaff();
  }, []);
  const staffList = useSelector((state) => state.staff);
  console.log("staffLIST ",staffList)

  const { staff: staffs } = staffList;
  const [openDelete, setOpenDelete] = useState({});
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [openUpdate, setOpenUpdate] = useState({});
  
  var listSearchItem = staffs.filter((item) => 
    item.name.toUpperCase().includes(searchItem.toUpperCase())
  );

  const onOpenDelete = (id) => {
    console.log("DEL ID", id)
    setOpenDelete({[id]: true});
  }
  
  
  const onSearchItem = (event) => {
    setSearchItem(event.target.value);
  }
  const classes = useStyle();
  return (
    <Box className={classes.staffContainer}>
      <Box className={classes.staffHeader}>
        <Typography variant="h3">Danh sách nhân viên</Typography>
      </Box>
      <Box className={classes.toolBox}>
        <Grid container>
          <Grid item lg={11}>
            <OutlinedInput className={classes.staffSearch}
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
            <IconButton className={classes.btnAddStaff} onClick={() => setOpenAddStaff(true)}>
              <AddToPhotosIcon fontSize="large"/>
            </IconButton>
            <AddStaffDialog open={openAddStaff} onClose={()=> setOpenAddStaff(false)}/>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.staffTable}>
        <Table className={classes.Table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Mã NV</TableCell>
              <TableCell align="left">Họ và tên</TableCell>
              <TableCell align="left">Ngày sinh</TableCell>
              <TableCell align="left">SĐT</TableCell>
              <TableCell align="left">Quê quán</TableCell>
              <TableCell align="left">Ngày vào làm</TableCell>
              <TableCell align="left">Vị trí</TableCell>
              <TableCell align="left">Tuỳ Chọn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!searchItem ? staffs.map((staff) => {
              const { _id, Ecode, name, phone, DoB, birthPlace, joinDate, role } = staff;
              return (
              <TableRow key={_id}>
                <TableCell align="left">{_id}</TableCell>
                <TableCell align="left">{Ecode}</TableCell>
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">{formatDatePicker(DoB)}</TableCell>
                <TableCell align="left">{phone}</TableCell>
                <TableCell align="left">{birthPlace}</TableCell>
                <TableCell align="left">{formatDatePicker(joinDate)}</TableCell>
                <TableCell align="left">{role}</TableCell>
                <TableCell align="left" className={classes.btnOption}>
                  <IconButton onClick={()=>setOpenUpdate({[_id]: true})}>
                    <BuildIcon fontSize="medium" />
                  </IconButton>
                  <UpdateStaffDialog open={openUpdate[staff._id] ? true : false} staff={staff} onClose={()=>setOpenUpdate({[staff._id]: false})}/>
                  <IconButton  onClick={()=>onOpenDelete(_id)}>
                    <DeleteIcon  fontSize="medium" />
                  </IconButton>
                  <DeleteStaffDialog open={openDelete[_id] ? true : false} staffId={_id} onClose={()=>setOpenDelete({[_id]: false})} />
                </TableCell>
              </TableRow>
            )}) 
            : 
            (
              listSearchItem.map((staff) => {
                const { _id, Ecode, name, phone, DoB, birthPlace, joinDate, role } = staff;
                return (
                <TableRow key={_id}>
                  <TableCell align="left">{_id}</TableCell>
                  <TableCell align="left">{Ecode}</TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{DoB}</TableCell>
                  <TableCell align="left">{phone}</TableCell>
                  <TableCell align="left">{birthPlace}</TableCell>
                  <TableCell align="left">{joinDate}</TableCell>
                  <TableCell align="left">{role}</TableCell>
                  <TableCell align="left" className={classes.btnOption}>
                    <IconButton onClick={()=>setOpenUpdate({[_id]: true})}>
                      <BuildIcon fontSize="medium" />
                    </IconButton>
                    <UpdateStaffDialog open={openUpdate[staff._id] ? true : false} staff={staff} onClose={()=>setOpenUpdate({[staff._id]: false})}/>
                    <IconButton  onClick={()=>onOpenDelete(_id)}>
                      <DeleteIcon  fontSize="medium" />
                    </IconButton>
                    <DeleteStaffDialog open={openDelete[_id] ? true : false} staffId={_id} onClose={()=>setOpenDelete({[_id]: false})} />
                  </TableCell>
                </TableRow>
              )})
            )

          }
          </TableBody>
        </Table>
      </Box>
    </Box>
);
}

const useStyle = makeStyles(() => ({
  staffContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "80%",
    minHeight: "88vh",
    //maxHeight:'85vh'
  },
  staffHeader: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  toolBox: {
    height: "60px",
  },
  staffSearch: {

  },
  inputSearch: {

  },
  addGrid: {
    display: 'flex',
    justifyContent: 'end',
  },
  btnAddStaff: {
    maxWidth: '60px',
  },
  staffTable: {
    marginTop: "10px",
  },
  btnOption: {
    display: 'flex'
  },
  btnShowItem: {
    textAlign: 'left'
  }
}));
export default Staff;
