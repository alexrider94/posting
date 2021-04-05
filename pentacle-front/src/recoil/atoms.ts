import { atom, RecoilState } from 'recoil';
import { UserAuth } from '../types/User.type';
import { Board } from '../types/Board.type';

const userAuthInfo = {
  isAuth: false,
};

const token = window.localStorage.getItem('user');
if (token && token !== '') {
  userAuthInfo.isAuth = true;
}

export const userState: RecoilState<UserAuth> = atom<UserAuth>({
  key: 'userState',
  default: userAuthInfo,
});

export const boardState: RecoilState<Board[]> = atom<Board[]>({
  key: 'boardState',
  default: [{}],
});

export const clickState: RecoilState<string> = atom({
  key: 'clickState',
  default: 'BoardPage',
});

export const currentBoardNoState: RecoilState<number> = atom({
  key: 'currentBoardNo',
  default: -1,
});
