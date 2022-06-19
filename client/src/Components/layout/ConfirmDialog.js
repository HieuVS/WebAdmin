import { Button, Dialog, DialogTitle, Box, Typography,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function ConfirmDialog(props) {
  const { onClose, open } = props;
  const classes = useStyle();
  

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>CONFIRMATION</DialogTitle>
      <Typography>Bạn có muốn xoá sản phẩm không?</Typography>
      <Box>
        <Button></Button>
        <Button></Button>
      </Box>
    </Dialog>
  );
}

const useStyle = makeStyles(() => ({

}));

export default ConfirmDialog;
