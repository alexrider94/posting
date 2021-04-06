/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';

/* react hook */
import React, { useEffect, useState } from 'react';

/* graphql API and Common func*/
import { GET_BOARD_INFO, DELETE_BOARD, CREATE_COMMENT } from '../services/API';
import { getTimeStamp } from '../services/common';

/* postit css file */
import './post.css';

/* state */
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentBoardInfoState, userInfoState } from '../recoil/selector';
import { clickState, currentBoardNoState } from '../recoil/atoms';

const useStyles = makeStyles({
    root: {
        position: "relative",
        width: "100%",
        height: "auto",
    },
    backBtn: {
        position: "relative",
        margin:10,
        background: 'linear-gradient(20deg, #A39DC8 , #645CA2 )',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
    },
    delBtn: {
        position: "relative",
        margin:10,
        background: 'linear-gradient(60deg, #4C467C, #343055)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
    },
    cardImgBack:{
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
    },
    card: {
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        height: "20rem",
    },
    pagenation: {
        textAlign: "center"
    },
    addArea: {
        margin: 10,
        padding: 3,
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
    stickyMemo: {
        position:"absolute",
        width: "50%",
        zIndex: 0
    },
    commentArea: {
        marginLeft: "20%",
        marginRight: "20%",
        marginTop: "0",
    }
})

export interface BoardDetailProps {
}

export const BoardDetail:React.FC<BoardDetailProps> = () =>  {
    const classes = useStyles();

    const boardInfo = {
        no: null,
        title: "",
        b_content: "",
        createdDate: "",
        name: "",
    }

    const [change, setChange] = useState(false);
    const [info, setInfo] = useState(boardInfo);
    const [isAuth, setIsAuth] = useState(false);

    /*  commentPageLocalState */
    const itemsPerPage = 3;
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [page, setPage] = useState(1);
    const [noOfPages, setNoOfPages] = useState(
        Math.ceil(commentList.length / itemsPerPage)
    );

    const user = useRecoilValue(userInfoState);
    const currentBoardNo = useRecoilValue(currentBoardNoState);
    const [clickInfo, setClickInfo] = useRecoilState(clickState);
    const currentBoardInfo = useRecoilValue(currentBoardInfoState);

    useEffect(() => {
        if (user.no === currentBoardInfo.user.no) {
            setIsAuth(true);
        }
        const date = new Date(Number(currentBoardInfo.createdDate));
        let newDate = getTimeStamp(date);
        let boardInfo = Object.create(currentBoardInfo);
        Object.defineProperty(boardInfo, 'createdDate',{value: newDate,configurable: true});
        setInfo(boardInfo);
        setCommentList(currentBoardInfo.comments);
        setNoOfPages(Math.ceil(currentBoardInfo.comments.length / itemsPerPage));

    },[]);

    useEffect(() => {
        GET_BOARD_INFO({ currentBoardNo }).then((boardList) => {
            setCommentList(boardList.comments);
            setNoOfPages(Math.ceil(boardList.comments.length / itemsPerPage));
        })
         setChange(false);
    }, [change])

    const handleDelete = () => {
        const boardNo = currentBoardNo;
        DELETE_BOARD({ boardNo }).then(() => {
            setClickInfo("BoardPage");
        });
    }

    const addComment = (e:any) => {
        e.preventDefault();
        if (comment === "") {
            alert("comment is empty. please fill comment");
            return;
        }
        else {
            const content = comment;
            const boardNo = currentBoardNo;
            const userNo = user.no;
            CREATE_COMMENT({ content, boardNo, userNo }).then((res) => {
                if (res === true) {
                    alert("comment added");
                    setChange(true);
                    setComment("");
                }
                else{
                    alert("error");
                    setChange(true);
                }
            })
        }
    }

    const handlePageChange = (event:any, value:any) => {
        setPage(value);
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.cardImgBack}>
                    <div className="postit">
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            글쓴이 : {info.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {info.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {info.createdDate}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {info.b_content}
                        </Typography>
                    </div>
                    </div>

                 </Grid>
                <Grid item xs={12} className={classes.commentArea}>
                    <Button className={classes.backBtn} variant="contained" onClick={()=>{setClickInfo('BoardPage')}}>뒤로가기</Button>
                    {isAuth ? (<Button className={classes.delBtn} variant="contained" onClick={handleDelete}>삭제하기</Button>) : (<></>)}
                    <List>
                        {commentList.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((value:any,index:any) =>
                            (
                            <ListItem key={index}>
                                <ListItemText primary={value.user.name} secondary={value.c_content} />
                            </ListItem>
                            )
                        )}
                    </List>
                    <Paper component="form" onSubmit={addComment} className={classes.addArea}>
                        <InputBase
                            className={classes.input}
                            placeholder="comment"
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            value={comment}
                        />
                        <Divider orientation="vertical" />
                        <IconButton color="primary" onClick={addComment}>
                            <CreateIcon />
                        </IconButton>
                    </Paper>
                    <Grid container justify="center">
                        <Pagination
                            count={noOfPages}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}