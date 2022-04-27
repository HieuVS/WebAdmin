import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
const WarningMessage = ({info}) => {

  const classes = useStyle();
  return info === null ? null : (
    <Alert className={classes.warning} severity="warning" variant="standard">{info.message}</Alert>
  )

}

const useStyle = makeStyles(() => ({
    warning: {
        margin: '10px'
    }
}))
export default WarningMessage