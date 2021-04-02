import React, { useState, useEffect } from 'react';
import { GET_ALL_BOARD } from '../services/API';
import { makeStyles } from '@material-ui/core/styles';
import { StickyPaper } from './StickyPaper';

const useStyles = makeStyles((theme) => ({
    listRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY: 'hidden',
        margin:0,
        padding:0
    },
    gridList: {
        width: "100%",
        height: 400,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    imgList: {
        width: 300,
        height: 300,
    }
}));

interface ChildProps {
    getBoardNo?: any;
}

export const BoardList:React.FC<ChildProps> = (props:any) => {
    const classes = useStyles();
    const [board, setBoard] = useState([]);

    useEffect(() => {
        GET_ALL_BOARD().then((res) => {
            setBoard(res);
        });
    }, []);

    const handleClick = (no:any) => {
        props.getBoardNo(no);
    }

    const renderStickyPaper = () => {
        console.log(board);
        const stickyPaper = board.map((b) => {
            const no = Math.floor(Math.random()*4 + 1);
            return (
                <StickyPaper value={b} randNo={no} handleClick={handleClick}></StickyPaper>
            )
        })
        return stickyPaper
    }

    return (
        <div className={classes.listRoot}>
            {renderStickyPaper()}
        </div>
    );
}

export default BoardList;