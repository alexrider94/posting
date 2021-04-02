import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CREATE_BOARD, DECODE_TOKEN } from '../services/API';
import React, { useState } from 'react';

const useStyles = makeStyles({
    root: {
        position: "relative",
        width: "100%",
    },

    backBtn: {
        position: "relative",
        margin: 10,
        background: 'linear-gradient(20deg, #A39DC8 , #645CA2 )',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
    },

    createBtn: {
        position: "relative",
        margin: 10,
        background: 'linear-gradient(60deg, #4C467C, #343055)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
    },

    titleInp:{
        paddingTop: 30
    }

})

interface ChildProps {
    createBack?: any;
}

export const BoardCreate:React.FC<ChildProps> = (props:any) => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    const handleCreate = () => {
        if(title === "" || content === "") {
            alert("empty content or title");
            return;
        }
        const token = localStorage.getItem("user");
        DECODE_TOKEN({token}).then((res)=>{
            const no = res.no;
            CREATE_BOARD({ title, content, no }).catch((err) => { console.log(err) }).then((res)=>{
                console.log(res);
                props.createBack();
            });
        });
    }

    const classes = useStyles();
    return (
        <>
            <div className={classes.root} >
                <form className={classes.titleInp} noValidate autoComplete="off">
                    <TextField id="title" label="제목" variant="outlined" helperText="제목을 입력하세요." onChange={e => setTitle(e.target.value)}/>
                    <br />
                    <br />
                    <TextField id="content" label="내용" variant="outlined" multiline rows={10} helperText="내용을 입력하세요." onChange={e => setContent(e.target.value)} fullWidth={true} />
                </form>
            </div>
            <div>
                <Button className={classes.backBtn} variant="contained" onClick={props.createBack}>뒤로가기</Button>
                <Button className={classes.createBtn} variant="contained" onClick={handleCreate}>생성하기</Button>
            </div>
        </>
    );
}
