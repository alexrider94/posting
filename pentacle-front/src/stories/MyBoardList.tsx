import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import React, { useState, useEffect } from 'react';
import { GET_MYBOARD } from '../services/API';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/selector';
import { clickState, currentBoardNoState } from '../recoil/atoms';

interface ChildProps {
}

export const MyBoardList:React.FC<ChildProps> = () =>{
    const [board, setBoard] = useState([]);

    const user = useRecoilValue(userInfoState);
    const [boardNo, setBoardNo] = useRecoilState(currentBoardNoState);
    const [clickInfo, setClickInfo] = useRecoilState(clickState);

    useEffect(() => {
        const userNo = user.no;
        GET_MYBOARD({ userNo }).then((res) => {
            if(res.length === 0){
                setBoard([])
            }
            else{
                setBoard(res);
            }
        });
    });

    return (
        <div>
        <List>
            {board ? (
                <div>
                    {board.map((value:any, index:any) => {
                        return (
                            <div key={index} >
                                <ListItem button onClick={() => {
                                    setBoardNo(value.no);
                                    setClickInfo('BoardDetailPage');
                                }}>
                                    <ListItemText primary={value.title} />
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>
                    empty
                </div>
            )}
        </List >
            <Button variant="contained" color="secondary" onClick={()=>{setClickInfo('BoardPage')}}>Back</Button>
        </div>
    );
}