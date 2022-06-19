import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/layout/Header';
import Footer from '../Components/layout/Footer';
import Order from './Order';
import { makeStyles } from "@material-ui/core/styles";

function Main(props) {
    const classes = useStyle();
    return (
        <div>
            <Header />
            <Order/>
            <Footer className={classes.Footer}/>
        </div>
    );
}

const useStyle = makeStyles(() => ({
    Footer: {
        marginTop: 'auto',
    }
  }));

export default Main;