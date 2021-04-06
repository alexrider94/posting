import * as API from './services/API';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './stories/Login';
import { shallow  } from 'enzyme';
import { setupApi } from './setup';
import { gql } from '@apollo/client';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RecoilRoot } from 'recoil';
import { Footer } from './stories/Footer';
import { Header } from './stories/Header';
import SideMenu from './stories/SideMenu';
import { NotFound } from './stories/NotFound';
import { UserInfo } from './stories/UserInfo';
import { StickyPaper } from './stories/StickyPaper';
import { Register } from './stories/Register';
import { BoardCreate } from './stories/BoardCreate';
import { BoardDetail } from './stories/BoardDetail';
import BoardList from './stories/BoardList';
import { MyBoardList } from './stories/MyBoardList';
import { getAllBoard, getAllBoardService } from './getAllBoardService';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./setup.ts', () => {
  const mApolloClient = { query: jest.fn() };
  return { setupApi: jest.fn(() => mApolloClient) };
});

describe('graphQL API 테스팅', () => {
  it('모든 게시판 가져오기 API', async () => {
    const client = setupApi();
    const mGraphQLResponse = { data: {}, loading: false, errors: [] };
    client.query.mockResolvedValueOnce(mGraphQLResponse);
    const {data, loading, errors} = await getAllBoardService();

    expect(client.query).toBeCalledWith({ query: getAllBoard});

    expect(data).toEqual({});
    expect(loading).toBeFalsy();
    expect(errors).toEqual([]);
  });
});

describe('렌더링 테스팅', () => {
  it('<Login />', () => {
    const wrapper = shallow(<RecoilRoot><Login /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<Footer />', () => {
    const wrapper = shallow(<RecoilRoot><Footer /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<Header />', () => {
    const wrapper = shallow(<RecoilRoot><Header /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<SideMenu />', () => {
    const wrapper = shallow(<RecoilRoot><SideMenu /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<NotFound />', () => {
    const wrapper = shallow(<RecoilRoot><NotFound content="test"/></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<UserInfo />', () => {
    const wrapper = shallow(<RecoilRoot><UserInfo /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<StickyPaper />', () => {
    const wrapper = shallow(<RecoilRoot><StickyPaper value={
      {no: 1,
      createdDate: "test",
      b_content: "test",
      title: "test",
      user: {
          no: 1,
          id: "test",
          name: "test",
      }}
    }randNo={0}/></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<Register />', () => {
    const wrapper = shallow(<RecoilRoot><Register /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<BoardCreate />', () => {
    const wrapper = shallow(<RecoilRoot><BoardCreate /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<BoardDetail />', () => {
    const wrapper = shallow(<RecoilRoot><BoardDetail /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<BoardList />', () => {
    const wrapper = shallow(<RecoilRoot><BoardList /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
  it('<MyBoardList />', () => {
    const wrapper = shallow(<RecoilRoot><MyBoardList /></RecoilRoot>);
    expect(wrapper.length).toBe(1);
  })
})