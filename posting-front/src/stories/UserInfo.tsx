import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/selector';
import { clickState } from '../recoil/atoms';

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

export interface UserInfoProps {
}

export const UserInfo:React.FC<UserInfoProps> = () => {
    const classes = useStyles();
    const user = useRecoilValue(userInfoState);
    const [clickInfo, setClickInfo] = useRecoilState(clickState);

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
                        {user.name}
                    </Typography>

                    <Typography variant="h5" component="h2">
                        No
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {user.no}
                    </Typography>

                    <Typography variant="h5" component="h2">
                        Created Date
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {user.createdDate}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button variant="contained" color="secondary" onClick={()=>{setClickInfo('BoardPage')}}>Back</Button>
                </CardActions>
            </Card>
        </div>
    );
}