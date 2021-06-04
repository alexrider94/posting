import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { LOGOUT } from '../../services/API';
import {BoardList} from '../../stories/BoardList';
import React, { useState } from 'react';
import {BoardDetail} from '../../stories/BoardDetail';
import {BoardCreate} from '../../stories/BoardCreate';
import {SideMenu} from '../../stories/SideMenu';
import {UserInfo} from '../../stories/UserInfo';
import Grid from '@material-ui/core/Grid';
import {MyBoardList} from '../../stories/MyBoardList';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import { useRecoilState }from 'recoil';
import { clickState } from '../../recoil/atoms';
const drawerWidth = 380;

const useStyles = makeStyles((theme) => ({
    mainRoot: {
        heigth: "100%",
    },
    logout: {
        position: "relative",
        textAlign: "right",
        padding: "5px",
        margin: 10,
        background: 'linear-gradient(60deg, #4C467C, #343055)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
    },
    create: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    userInfo: {
        border: "1px solid black"
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerButton: {
        position: "fixed",
        zIndex:5,
        top: 30,
        right: 30,
    },
    createBtn: {
        background: 'linear-gradient(60deg, #555273, #5E5A7E)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        width: 180,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    }
}))

function Board() {
    const [clickDrawer, setClickDrawer] = useState(false);
    const [clickInfo, setClickInfo] = useRecoilState(clickState);
    const handleDrawerOpen = () => {
        setClickDrawer(true);
    };

    const handleDrawerClose = () => {
        setClickDrawer(false);
    };

    const handleLogout = async () => {
        LOGOUT();
        window.location.reload();
    }

    const handlecreate = () => {
        setClickInfo('BoardCreatePage');
    }

    const classes = useStyles();
    return (
        <>
            <div className={classes.mainRoot}>
                <div className={classes.drawerButton}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        className={clsx(clickDrawer && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        {clickInfo === 'MyBoardListPage' ? (
                            <>
                                <MyBoardList></MyBoardList>
                            </>
                        ) : (
                            <>
                                    {clickInfo === 'UserInfoPage' ? (
                                        <>
                                            <UserInfo></UserInfo>
                                        </>
                                    ) : (
                                            <>
                                                {clickInfo === 'BoardDetailPage' ? (
                                                    <BoardDetail></BoardDetail>
                                                ) : (
                                                        <>
                                                            {clickInfo === 'BoardCreatePage' ? (
                                                                <BoardCreate></BoardCreate>
                                                            ) : (
                                                                    <>
                                                                        <div className={classes.create} >
                                                                            <Button variant="contained" className={classes.createBtn} onClick={handlecreate}>
                                                                                <Typography>P o s t</Typography>
                                                                            </Button>
                                                                        </div>
                                                                        <BoardList></BoardList>
                                                                    </>
                                                                )}
                                                        </>
                                                    )}
                                            </>
                                        )}
                            </>
                        )}
                    </Grid>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="right"
                        open={clickDrawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronRightIcon />
                        </IconButton>
                        <SideMenu></SideMenu>

                        <Button className={classes.logout} variant="contained" onClick={handleLogout}>로그아웃</Button>

                    </Drawer>
                </Grid>

                </div>
        </>
    );
}

export default Board;
