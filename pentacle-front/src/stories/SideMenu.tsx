import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React from 'react';

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
interface ChildProps {
    userInfo?: any;
    handleUserDelete?: any;
    handleUserInfo?: any;
    handleMyBoard?: any;
}
export const SideMenu:React.FC<ChildProps> = (props:any) => {
    console.log(props);
    const classes = useStyles();

    return (
        <div className={classes.sideRoot}>
            <Grid container justify="center">
                <Avatar className={classes.avatar}></Avatar>
            </Grid>
            <Grid container justify="center">
                <Typography gutterBottom variant="h5">
                    {props.userInfo.name}
                        </Typography>
            </Grid>
            <Divider />
            <Grid container justify="center">
                <List>
                    <ListItem button onClick={props.handleUserInfo}>
                        <ListItemText>유저정보</ListItemText>
                    </ListItem>
                    <ListItem button onClick={props.handleMyBoard}>
                        <ListItemText>작성글보기</ListItemText>
                    </ListItem>
                    <ListItem button onClick={props.handleUserDelete}>
                        <ListItemText className={classes.deleteAcc}>탈퇴하기</ListItemText>
                    </ListItem>
                </List>
            </Grid>
        </div>
    );
}

export default SideMenu;