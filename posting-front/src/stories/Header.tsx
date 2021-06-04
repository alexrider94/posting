import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import logImg from '../img/header_logo.png';

const useStyles = makeStyles({
    header: {
        textAlign: "center",
        margin: 0,
        padding: 0,
        top:0,
        background: "#FFFFFF",
        alignItems:"center",
        zIndex: 3,
    },
    i: {
        padding: 30,
        width: 120,
        height: 120,
    }
})

export const Header:React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.header} elevation={0} position="relative">
            <img src={logImg} className={classes.i} alt="load image failed"></img>
        </AppBar>
    );
}