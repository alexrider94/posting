import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        height: 70,
        padding: "15px 5px",
        marginTop: "auto",
        background: 'linear-gradient(60deg, #525252, #2C2C2C)',
        backgroundColor:"#525252",
    },
    footerOne: {
        display: "block",
        color: "#C1BFBF",
        float:"right"
    },
    footerTwo: {
        display: "inline",
        color: "#C1BFBF",
    },
    img: {
        display: "inline",
        width: 30,
        height: 30,
    },
})

export const Footer:React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <div>
                <div className={classes.footerTwo}>
                <Typography >© Copyright by JS Study</Typography>
                </div>
            </div>
            <div>
                <div className={classes.footerOne}>
                    <Typography >℗ Board Project</Typography>
                    <Typography >This site made for Project Study</Typography>
                </div>
            </div>
        </div>
    );
}
