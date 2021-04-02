import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "100%",
        height: "90vh"
    },
    title: {
        fontSize: 26,
    },
    pos: {
        marginBottom: 12,
    },
}))

interface ChildProps {
    userInfo?: any;
    userInfoBack?: any;
}

export const UserInfo:React.FC<ChildProps> = (props:any) => {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        User Information
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Name
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.userInfo.name}
                    </Typography>

                    <Typography variant="h5" component="h2">
                        No
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.userInfo.no}
                    </Typography>

                    <Typography variant="h5" component="h2">
                        Password
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.userInfo.pw}
                    </Typography>

                    <Typography variant="h5" component="h2">
                        Created Date
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.userInfo.createdDate}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button variant="contained" color="secondary" onClick={props.userInfoBack}>Back</Button>
                </CardActions>
            </Card>
        </div>
    );
}