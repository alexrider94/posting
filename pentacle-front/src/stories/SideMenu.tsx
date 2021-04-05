import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickState } from '../recoil/atoms';
import { DELETE_USER, LOGOUT } from '../services/API';
import { userInfoState } from '../recoil/selector';

const useStyles = makeStyles((theme:any) => ({
    sideRoot: {
        position: "relative",
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: 20,
    },
    deleteAcc: {
        color:"red",
    }
}))
export interface SideMenuProps {
}

export const SideMenu:React.FC<SideMenuProps> = (props:any) => {
    const classes = useStyles();
    const [clickInfo, setClickInfo] = useRecoilState(clickState);
    const user = useRecoilValue(userInfoState);

    const handleUserDelete = () => {
        let userNo = user.no;
        DELETE_USER({ userNo }).then((res) => {
            if (res === true){
                LOGOUT();
                alert("user deleted");
                window.location.reload();
            }
            else{
                alert("user delete error");
            }
        })
    }
    return (
        <div className={classes.sideRoot}>
            <Grid container justify="center">
                <Avatar className={classes.avatar}></Avatar>
            </Grid>
            <Grid container justify="center">
                <Typography gutterBottom variant="h5">
                    {props.userInfo}
                        </Typography>
            </Grid>
            <Divider />
            <Grid container justify="center">
                <List>
                    <ListItem button onClick={()=>{setClickInfo('UserInfoPage')}}>
                        <ListItemText>유저정보</ListItemText>
                    </ListItem>
                    <ListItem button onClick={()=>{setClickInfo('MyBoardListPage')}}>
                        <ListItemText>작성글보기</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleUserDelete}>
                        <ListItemText className={classes.deleteAcc}>탈퇴하기</ListItemText>
                    </ListItem>
                </List>
            </Grid>
        </div>
    );
}

export default SideMenu;