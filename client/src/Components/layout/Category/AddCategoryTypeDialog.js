import { Button, Dialog, DialogTitle, TextField, Box, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from '@material-ui/icons/Cancel';
import {  useState } from "react";
import { postType } from "../../../api/categoryApi";

function AddCategoryTypeDialog(props) {
  const { open, onClose } = props;
  const classes = useStyle();
  const [categoryForm, setCategoryForm] = useState({type: ''});

  //console.log('categoryForm: ',categoryForm);

  const onAddOrder = async (event) => {
    event.preventDefault();
    try {
      const { success, message } = await postType(categoryForm);
      if(!success) console.log('Error: ', message)
      else {
        setCategoryForm({type:''});
        console.log('add successfully')
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog
      open={open}
      maxWidth={false}
      className={classes.dialogAddItem}
      PaperProps={{className: classes.orderPaper}}
    >
      <Box>
        <IconButton className={classes.btnClose} onClick={onClose}>
          <CancelIcon className={classes.iconClose}/>
        </IconButton>        
        <DialogTitle >Thêm danh mục sản phẩm</DialogTitle>
        <Box className={classes.boxAddItem}>
          <form onSubmit={onAddOrder} >
            <Box className={classes.boxCategoryType}>
              <Typography variant="h6">Loại sản phẩm:</Typography>
              <TextField value={categoryForm.type} onChange={(event)=>setCategoryForm({type: event.target.value})}/>
            </Box>
            <Button type="submit" className={classes.btnSubmit}>Thêm</Button>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
}

const useStyle = makeStyles(() => ({
  dialogAddItem: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  orderPaper: {
    position: 'relative',
    minWidth: '50%',
    maxHeight: '700px',
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
  boxAddItem: {
    padding: '16px'
  },
  boxCategoryType: {
    padding: '8px'
  },
  btnSubmit: {
    marginTop: '30px',
    width: '36px'
  }
}));
export default AddCategoryTypeDialog;
