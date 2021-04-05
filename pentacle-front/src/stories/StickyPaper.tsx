import { makeStyles } from '@material-ui/core/styles';
import stickyImg1 from '../img/sticky_1.png';
import stickyImg2 from '../img/sticky_2.png';
import stickyImg3 from '../img/sticky_3.png';
import stickyImg4 from '../img/sticky_4.png';
import stickyImg5 from '../img/sticky_5.png';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { getTimeStamp } from '../services/common';
import { useRecoilState } from 'recoil';
import { clickState, currentBoardNoState } from '../recoil/atoms';

const imgList = [stickyImg1,stickyImg2,stickyImg3,stickyImg4,stickyImg5]

const useStyles = makeStyles(() => ({
    paperRoot:{
        position:"relative",
        padding:5,
        margin:2,
    },
    img:{
        width:280,
        height:280,
    },
    title:{
        wordBreak: "break-all",
        position:"absolute",
        fontSize: "1.2em",
        marginRight: 50,
        top: 60,
        left: 80
    },
    date: {
        position:"absolute",
        fontSize: "0.6em",
        bottom: 80,
        left: 100
    },
    space:{
        position:"absolute",
        fontSize: "0.9em",
        color:"#696969",
        bottom: 75,
        left: 45
    }
}))

export interface StickyPaperProps {
    value: {
        no: number;
        createdDate: string;
        b_content: string;
        title: string;
        user: {
            no: number;
            id: string;
            name: string;
        }
    };
    randNo: number;
}

export const StickyPaper:React.FC<StickyPaperProps> = (props) => {
    const [boardNo, setBoardNo] = useRecoilState(currentBoardNoState);
    const [clickInfo, setClickInfo] = useRecoilState(clickState);
    const classes = useStyles();
    return (
        <div className={classes.paperRoot}>
            <div className={classes.space}>
            </div>
            <div className={classes.title}>
                <Typography>
                    {props.value.title}
                </Typography>
            </div>
            <div className={classes.date}>
                {getTimeStamp(props.value.createdDate)}
            </div>
            <img src={imgList[props.randNo]} className={classes.img} onClick={
                ()=>{
                    setBoardNo(props.value.no);
                    setClickInfo('BoardDetailPage');
                }
            } alt="error"></img>
        </div>
    );
}