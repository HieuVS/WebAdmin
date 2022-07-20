import React, { useEffect } from "react";
import { Button, Dialog, DialogTitle, IconButton, Paper, Grid, TextField, RadioGroup, FormControlLabel, Radio, Typography, Box, MenuItem, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { postItem, putItem } from "../../../api/itemApi";
import WarningMessage from "../WarningMessage";
import { imageToBase64 } from '../../../constants/imageToBase64';


export default function UpdateItemDialog(props) {
  const { open, onClose, item, type } = props;
  const classes = useStyle();
  const [updateItemForm, setUpdateItemForm] = useState({
    ...item,
    isTax: item.isTax ? "Yes" : "No",
  });
  const { name, description, price, image, stock, isTax, category } = updateItemForm;
  const [alert, setAlert] = useState(null);
  const [changeImg, setChangeImg] = useState();


  const onChangeUpdateItem = (event) => {
    setUpdateItemForm({
      ...updateItemForm,
      [event.target.name]: event.target.value,
    });
  };
  console.log("updateItemForm:", updateItemForm);

  useEffect(()=> {
    return (()=> {
        changeImg && URL.revokeObjectURL(changeImg.preview)
    })
  },[changeImg])

  const onHandleImage = (event) => {
    setUpdateItemForm({...updateItemForm, image: event.target.files[0]});
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setChangeImg(file)
  }

  const onUpdateItem = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name',name);
    data.append('description',description);
    data.append('price',price);
    data.append('image',image);
    data.append('stock',stock);
    data.append('isTax',isTax);
    data.append('category',category);
    console.log('DATA: ', data)
    try {
      const { success, message } = await putItem(data, updateItemForm._id);
        if(!success) {
          setAlert({ type: "danger", message: message });
          setTimeout(() => setAlert(null), 5000);
        }
        else {
        console.log("OK ");
        setUpdateItemForm({
            name: '',
            description: '',
            price: Number,
            image: null,
            stock: Number,
            isTax: 'Yes',
            category: ''
          }) 
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog
      open={open}
      className={classes.pickItemDialog}
      maxWidth={false}
      PaperProps={{ className: classes.pickItemPaper }}
    >
      <IconButton className={classes.btnClose} onClick={onClose}>
        <CancelIcon className={classes.iconClose} />
      </IconButton>
      <DialogTitle>Thêm sản phẩm mới</DialogTitle>
      <WarningMessage info={alert}/>
      <Paper className={classes.paperAddItem}>
        <form onSubmit={onUpdateItem} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item md={6} className={classes.inputAddInfo}>
              <TextField variant="outlined" fullWidth required label="Tên sản phẩm" value={name} name="name" onChange={onChangeUpdateItem}/> 
            </Grid>
            <Grid item md={6} className={classes.inputAddInfo}>
              <Typography>Có tính thuế? </Typography>
              <RadioGroup value={isTax} className={classes.radioTax} required={true}>
                <FormControlLabel className={classes.radio} value='Yes' name="isTax" label="Có" onChange={onChangeUpdateItem}  control={<Radio color="primary" />}/>
                <FormControlLabel className={classes.radio} value='No' name="isTax" label="Không" onChange={onChangeUpdateItem} control={<Radio color="primary"/>}/>
              </RadioGroup>
            </Grid>
            <Grid item md={12} lg={12} className={classes.inputAddInfo}>
              <TextField label="Mô tả" value={description} name="description" onChange={onChangeUpdateItem} fullWidth variant="outlined" multiline minRows={2}/> 
            </Grid>
            <Grid item md={6} className={classes.inputAddInfo}>
              <TextField label="Giá sản phẩm" value={price} name="price" onChange={onChangeUpdateItem} fullWidth variant="outlined" type="number"/>
            </Grid>
            <Grid item md={6} className={classes.inputAddInfo}>
              <TextField label="Số lượng" value={stock} name="stock" onChange={onChangeUpdateItem} fullWidth variant="outlined" type="number"/>
            </Grid>
            {image ? 
            (<Box className={classes.boxPreviewImg}>
               <IconButton className={classes.btnCloseImg} onClick={()=>setUpdateItemForm({...updateItemForm,image: null})}>
                 <CancelIcon className={classes.iconCloseImg} />
               </IconButton>
               <Avatar variant="square" src={image.data ? `data:image/png;base64,${imageToBase64(image.data.data)}` : changeImg.preview}  className={classes.imgItem}/>
            </Box>) 
            : 
            (<IconButton variant="contained" component="label" className={classes.btnUpload}>
              <CloudUploadIcon style={{marginRight: '10px'}}/>Upload File
              <input type="file" fieldname="image" id="image" name="image" onChange={onHandleImage} hidden />
            </IconButton>)
            }
            <Grid item md={12} style={{marginTop: '5px'}} className={classes.inputAddInfo}>
              <TextField value={category} onChange={onChangeUpdateItem} name="category" variant="outlined" select label="Chọn danh mục" className={classes.selectDish}>
                {type.map(option => (
                    <MenuItem key={option._id} value={option._id}>{option.type}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box className={classes.boxSubmit}>
            <Button type="submit" variant="contained" className={classes.btnSubmit}>UPDATE</Button>
          </Box>
        </form>
      </Paper>
    </Dialog>
  );
}

const useStyle = makeStyles(() => ({
  pickItemPaper: {
    display: "block",
    width: "65%",
    height: "580px",
  },
  btnClose: {
    position: "absolute",
    right: "-12px",
    top: "-13px",
    float: "right",
  },
  iconClose: {
    fontSize: "40px",
    color: "#000",
  },
  paperAddItem: {
    width: '95%',
    margin: '0 auto',
    padding: '10px'
  },
  inputAddInfo: {
    width: '100%'
  },
  radioTax: {
    maxHeight: '60px'
  },
  btnUpload:{
    marginLeft: '8px',
    width: '33%',
    backgroundColor: '#20B2AA',
    maxHeight: '60px',
    borderRadius: '18px',
    '&:hover': {
        backgroundColor: "#EF5845"
    },
    display: 'flex',
    justifyContent: 'center'
  },
  selectDish: {
    width: '33%'
  },
  boxSubmit: {
    display: 'flex',
    justifyContent: 'center'
  },
  btnSubmit: {
    backgroundColor: '#20B2AA',
    borderRadius: '6px',
    marginTop: '20px',
    '&:hover': {
        backgroundColor: "#EF5845"
    }
  },
  boxPreviewImg: {
    position: 'relative',
    width: '40%'
  },
  btnCloseImg: {
    position: 'absolute',
    zIndex: 100,
    right: '-6px',
    top: '-6px'
  },
  iconCloseImg: {
    fontSize: '24px',
    opacity: 0.7
  },
  imgItem: {
    width: '100%',
    height: '90%',
    margin: 'auto'
  }
}));
