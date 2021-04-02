
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { GET_BOARD_INFO, DECODE_TOKEN, DELETE_BOARD, CREATE_COMMENT } from '../services/API';
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
import StickyMemoImg from '../img/sticky_memo.png';
import './post.css';

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

function getTimeStamp(date:any) {
    let d = new Date(date);
    let s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +

        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2) + ':' +
        leadingZeros(d.getSeconds(), 2);

    return s;
}

function leadingZeros(n:any, digits:any) {
    let zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

interface ChildProps {
    handleBack?: any;
    data?: any;
}

export const BoardDetail:React.FC<ChildProps> = (props:any) =>  {
    const classes = useStyles();
    const boardInfo = {
        no: null,
        title: "",
        b_content: "",
        createdDate: "",
        name: "",
    }
    const [comment, setComment] = useState("");
    const [change, setChange] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [info, setInfo] = useState(boardInfo);
    const [isAuth, setIsAuth] = useState(false);
    const [uNo, setuNo] = useState(null);
    const itemsPerPage = 3;
    const [page, setPage] = useState(1);
    const [noOfPages, setNoOfPages] = useState(
        Math.ceil(commentList.length / itemsPerPage)
    );

    useEffect(() => {
        const token = localStorage.getItem("user");

        DECODE_TOKEN({ token }).then((decode) => {
            const userNo = decode.no;
            setuNo(userNo);
            const no = props.data;
            GET_BOARD_INFO({ no }).then((res) => {
                if (userNo === res[0].userNo) {
                    setIsAuth(true);
                }
                const date = new Date(res[0].createdDate);
                res[0].createdDate = getTimeStamp(date);
                setInfo(res[0]);
            });
        });
    }, []);

    useEffect(() => {
        const boardNo = props.data;
        GET_BOARD_INFO({ boardNo }).then((boardList) => {
            setCommentList(boardList.data.reverse());
            setNoOfPages(Math.ceil(boardList.data.length / itemsPerPage));
        })
        setChange(false)
    }, [change])

    const handleDelete = () => {
        const boardNo = props.data;
        DELETE_BOARD({ boardNo }).then(() => {
            props.handleBack();
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
            const boardNo = props.data;
            const userNo = uNo
            CREATE_COMMENT({ content, boardNo, userNo }).then((res) => {
                if (res.data === "ADD_COMMENT") {
                    alert("comment added");
                    setChange(true);
                    setComment("");
                }
            })
        }
    }

    const handlePageChange = (event:any, value:any) => {
        setPage(value);
    };

    return (
        <div className={classes.root}>
            {/* <img src={StickyMemoImg} className={classes.stickyMemo}></img> */}
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
                    <Button className={classes.backBtn} variant="contained" onClick={props.handleBack}>뒤로가기</Button>
                    {isAuth ? (<Button className={classes.delBtn} variant="contained" onClick={handleDelete}>삭제하기</Button>) : (<></>)}
                    <List>
                        {commentList.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((value:any,index:any) =>
                            (
                            <ListItem key={index}>
                                <ListItemText primary={value.name} secondary={value.c_content} />
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