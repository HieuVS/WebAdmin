import React from 'react';
import Order from './Order';
import { makeStyles } from "@material-ui/core/styles";
import restaurant from '../assets/image/restaurant.jpg'

function Main(props) {
    const classes = useStyle();
    return (
        <div className={classes.orderBox}>
            <Order/>                     
        </div>
    );
}

const useStyle = makeStyles(() => ({
    orderBox: {
        //backgroundImage: `url(${restaurant})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // zIndex: -1
       //backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(${logo})`
    },

  }));
export default Main;