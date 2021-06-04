import { RecoilValueReadOnly, selector } from 'recoil';
import { GET_BOARD_INFO, GET_USER_INFO } from '../services/API';
import { User } from '../types/User.type';
import { currentBoardNoState } from './atoms';

export const userInfoState: RecoilValueReadOnly<User> = selector<User>({
  key: 'userInfoState',
  get: async () => {
    let userInfo = GET_USER_INFO();
    return userInfo;
  },
});

export const currentBoardInfoState = selector({
  key: 'currentBoardInfoState',
  get: async ({ get }) => {
    const currentBoardNo = get(currentBoardNoState);
    const boardInfo = GET_BOARD_INFO({ currentBoardNo });
    return boardInfo;
  },
});
