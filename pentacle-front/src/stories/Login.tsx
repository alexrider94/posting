import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { LOGIN } from '../services/API';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
    root: {
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
    },
    btn: {
        textAlign: "center",
        marginTop: "1rem",
    },
    inp: {
        textAlign: "center",
    },
    box: {
        paddingTop: 60,
        width: 350,
        height: 500,
        marginTop: 50,
        margin: "auto",
        background: "#FFFFFF",
        border: "solid 1px #A9A9A9",
        boxShadow: "1px 1px 1px 1px",
        borderRadius: "35px"
    },
    loginBtn: {
        background: 'linear-gradient(60deg, #555273, #5E5A7E)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },
    regBtn: {
        background: 'linear-gradient(60deg, #9B95C1, #BFBCD8)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    }
})

interface ChildProps {
    handleReg?: any;
}

export const Login:React.FC<ChildProps> = (props:any) =>  {
    const classes = useStyles();

    const [id, setID] = useState("");
    const [pw, setPW] = useState("");

    let [loginStatus, setloginStatus] = useState("");

    const handleLogin = async (evt:any) => {
        evt.preventDefault();
        try {
            const res = await LOGIN({ id, pw });
            if (res === "LOGIN FAIL") {
                setloginStatus("LOGIN FAILED");
                setID("");
                setPW("");
            }
            else {
                setloginStatus("");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            setloginStatus("LOGIN FAILED");
            setID("");
            setPW("");
        }
    }

    return (
        <div className={classes.root}>

            <Container className={classes.box} maxWidth="sm">

                <form className={classes.inp} noValidate autoComplete="off">
                    <Typography >
                        LOGIN
                    </Typography>
                    <TextField id="id" label="ID" onChange={e => setID(e.target.value)} />
                    <br />
                    <TextField id="pw" label="PW" type="password" onChange={e => setPW(e.target.value)} />
                    {loginStatus && <><h5 style={{ color: 'red', margin: 0 }}>{loginStatus}</h5></>}
                </form>
                <br />
                <br />
                <br />
                <br />
                <div className={classes.btn}>
                    <Button className={classes.loginBtn} style={{ maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px' }} variant="contained" onClick={handleLogin}>로그인</Button>
                    <br />
                    <br />
                    <Button className={classes.regBtn} style={{ maxWidth: '200px', maxHeight: '50px', minWidth: '200px', minHeight: '50px' }} variant="contained" onClick={props.handleReg}>회원가입</Button>
                </div>
            </Container>
        </div>
    );
}
